import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException
} from "@nestjs/websockets";
import {Inject, OnModuleInit} from "@nestjs/common";
import  {Server , Socket} from 'socket.io'
import {QuestionsService} from "../questions/questions.service";
import {Question} from "../entities/question.entity";
import Redis from "ioredis";
import {getRoom} from "../util/getRoom";
import { v4 as uuidv4 } from 'uuid';



@WebSocketGateway()
export class RoomGateWay implements OnModuleInit{


    private QUESTION_TIME =15;
    private ROUND_TIME = 20;


    constructor( @Inject('REDIS_CLIENT') private readonly redisClient: Redis ,  private questionsService : QuestionsService ) {

    }

    @WebSocketServer()
    server : Server

    onModuleInit() {
         this.server.on('connection' , (socket)=>{

             })
    }




    @SubscribeMessage('create-room')
    async createRoom(@ConnectedSocket() client  : Socket , @MessageBody() data : any){
            const roomId = uuidv4()
            await client.join(roomId)
            await this.redisClient.sadd(`${roomId}:players` , data.username );
            const roomData = {
                'room_admin' : data.username,
            }
            await this.redisClient.hset(`room:${roomId}`, roomData);
            this.server.to(roomId).emit("new-room" ,roomId )
    }

    @SubscribeMessage('join-room')
    async joinRoom(@ConnectedSocket() client  : Socket , @MessageBody() data : any ){
            if(await this.redisClient.hgetall(`room:${data.room}`)){
                await client.join(data.room)
                await this.redisClient.sadd(`${data.room}:players` , data.username )
                this.server.to(data.room).emit("joining" , `${data.username} joined the room`)
            }
            else {
                throw new  WsException('this room doesnt exist')
            }

    }

    @SubscribeMessage('leave-room')
    async leaveRoom(@ConnectedSocket() client : Socket , @MessageBody() data :any){
        let curRoom: string = "";

        for (const room of Array.from(client.rooms)) {
            if (room !== client.id) {
                await client.leave(room);
                curRoom = room;
            }
        }
        if(curRoom){

            this.server.to(curRoom).emit("leaving" , `${data.username} left the room`)

        }
    }

    @SubscribeMessage('start-game')
    async startGame(@ConnectedSocket() client: Socket) {

        const curRoom = getRoom(client)


        if (curRoom) {

            const questions: Question[] = await this.questionsService.generateRoomQuestion();
            console.log(questions[0].answer)
            if (questions.length === 0) return; // Prevent errors if no questions
            const roomData = {
                'created_at' : Date.now(),
                'questions' : JSON.stringify(questions),
                'isActive' : true,
                'current_question' : JSON.stringify(questions[0])
            }
            await this.redisClient.hset(`room:${curRoom}`, roomData);
            await this.initScores(curRoom)

            let currentQuestionIndex = 0;
            let questionTimer = this.QUESTION_TIME;
            let roundTimer = this.ROUND_TIME;
            let interval: NodeJS.Timeout;

            this.server.to(curRoom).emit("currentQuestion", questions[currentQuestionIndex]);
            let leaderboardShown = false

            let isProcessing = false;  // Flag to check if the game loop is already processing an iteration

            const gameLoop = async () => {
                if (isProcessing) return;  // If an iteration is already in progress, skip this one

                isProcessing = true;  // Set flag to indicate processing has started

                if (!leaderboardShown && (questionTimer === 0 || await this.didEveryoneSubmit(curRoom))) {
                    const new_scores = await this.updateScores(curRoom);
                    this.server.to(curRoom).emit("leaderboard", new_scores);
                    this.redisClient.del('room1:answers');
                    leaderboardShown = true;
                }

                if (questionTimer > 0) {
                    this.server.to(curRoom).emit("timer", questionTimer);
                    questionTimer--;
                }

                if (roundTimer === 0) {
                    currentQuestionIndex++;

                    if (currentQuestionIndex >= questions.length) {
                        clearInterval(interval);
                        isProcessing = false;  // Reset flag when game loop is stopped
                        return;
                    }

                    this.server.to(curRoom).emit("currentQuestion", questions[currentQuestionIndex]);
                    await this.redisClient.hset(`room:${curRoom}` , 'current_question' ,JSON.stringify(questions[currentQuestionIndex]) )
                    roundTimer = this.ROUND_TIME + 1;
                    questionTimer = this.QUESTION_TIME; // Reset timer for the next question
                    leaderboardShown = false;
                }

                roundTimer--;

                isProcessing = false;  // Reset flag after processing the current iteration
            };

            interval = setInterval(gameLoop, 1000);

        }

        else {
            throw new WsException('You arent in a room' )
        }


    }


    @SubscribeMessage('submit-answer')
    async submitAnswer(@MessageBody() user : any , @ConnectedSocket() client  : Socket){
        const curRoom = getRoom(client)
        if(curRoom && await this.redisClient.hget(`room:${curRoom}` , 'isActive' )){
                await this.redisClient.hset(`${curRoom}:answers` ,`${user.username}`, user.answer)

        }

        else {
            throw new WsException('You arent in a room')
        }

    }


    async didEveryoneSubmit (curRoom : string) : Promise<boolean>{
        const answers = await this.redisClient.hgetall('room1:answers')
        const submittedArray = Object.keys(answers)
        const roomPlayers = await  this.redisClient.smembers(`${curRoom}:players`)
        return submittedArray.length == roomPlayers.length

    }

    async initScores(curRoom : string){
        const roomPlayers = await  this.redisClient.smembers(`${curRoom}:players`)
        for (const player of roomPlayers) {
            await this.redisClient.hset(`${curRoom}:scores` ,`${player}`, 0)
        }
    }

    async updateScores (curRoom : string) {

        const usersAnswers = await this.redisClient.hgetall(`${curRoom}:answers`)
        const current_question  = await this.redisClient.hget(`room:${curRoom}` , 'current_question')
        const parsedQuestion : Question  = current_question ? JSON.parse(current_question) : null;
        for(let user in usersAnswers){
            if(this.questionsService.verifyAnswer(usersAnswers[user] , parsedQuestion)){
                await this.redisClient.hincrby(`${curRoom}:scores` ,`${user}` , 10)
            }
        }
        return this.redisClient.hgetall(`${curRoom}:scores`);

    }



    @SubscribeMessage('trigger')
    triggerErr(){
        throw new WsException('Invalid credentials.');
            }




}