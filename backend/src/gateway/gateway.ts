import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Inject, OnModuleInit, UseInterceptors} from "@nestjs/common";
import  {Server , Socket} from 'socket.io'
import {QuestionsService} from "../questions/questions.service";
import {Question} from "../entities/question.entity";
import Redis from "ioredis";
import {getRoom} from "../util/getRoom";
import {use} from "passport";



@WebSocketGateway()
export class RoomGateWay implements OnModuleInit{




    constructor( @Inject('REDIS_CLIENT') private readonly redisClient: Redis ,  private questionsService : QuestionsService) {

    }

    @WebSocketServer()
    server : Server

    onModuleInit() {
         this.server.on('connection' , (socket)=>{

             })
    }



    @SubscribeMessage('join-room')
    async joinRoom(@ConnectedSocket() client  : Socket , @MessageBody() data : any ){
            await client.join(data.room)
            await this.redisClient.sadd(`${data.room}:players` , data.username )
            this.server.to(data.room).emit("joining" , `${data.username} joined the room`)
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
            if (questions.length === 0) return; // Prevent errors if no questions
            const roomData = {
                'created_at' : Date.now(),
                'questions' : JSON.stringify(questions),
                'isActive' : true
            }
            await this.redisClient.hset(`room:${curRoom}`, roomData);
            let currentQuestionIndex = 0;
            let questionTimer = 3;
            let roundTimer = 15;
            let interval: NodeJS.Timeout;

            this.server.to(curRoom).emit("currentQuestion", questions[currentQuestionIndex]);
            let leaderboardShown = false

            const gameLoop = async () => {




                if( !leaderboardShown && (questionTimer === 0 || await this.didEveryoneSubmit(curRoom))){

                    this.server.to(curRoom).emit("leaderboard", 'dd');
                     this.redisClient.del('room1:answers')
                    // TODO  : create leaderboard from answers and emit it
                    leaderboardShown = true

                }

                if (questionTimer > 0) {
                    this.server.to(curRoom).emit("timer", questionTimer);
                    questionTimer--;

                }

                if (roundTimer === 0) {
                    currentQuestionIndex++;
                    if (currentQuestionIndex >= questions.length) {
                        clearInterval(interval);
                        return;
                    }


                    this.server.to(curRoom).emit("currentQuestion", questions[currentQuestionIndex]);
                    roundTimer = 16;
                    questionTimer = 3; // Reset timer for the next question
                    leaderboardShown = false

                }


                roundTimer--;
            };

            interval = setInterval(gameLoop, 1000);
        }
    }


    @SubscribeMessage('submit-answer')
    async submitAnswer(@MessageBody() user : any , @ConnectedSocket() client  : Socket){
        const curRoom = getRoom(client)
        if(curRoom && await this.redisClient.hget(`room:${curRoom}` , 'isActive' )){
                await this.redisClient.hset(`${curRoom}:answers` ,`${user.username}`, user.answer)

        }

    }


    async didEveryoneSubmit (curRoom : string) : Promise<boolean>{
        const answers = await this.redisClient.hgetall('room1:answers')
        const submittedArray = Object.keys(answers)
        const roomPlayers = await  this.redisClient.smembers(`${curRoom}:players`)
        return submittedArray.length == roomPlayers.length

    }




}