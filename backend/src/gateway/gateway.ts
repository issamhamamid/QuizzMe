import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Inject, OnModuleInit, UseInterceptors} from "@nestjs/common";
import  {Server , Socket} from 'socket.io'
import {QuestionsService} from "../questions/questions.service";
import {Question} from "../entities/question.entity";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import { Cache } from 'cache-manager';
import {CacheInterceptor} from "@nestjs/cache-manager";



@WebSocketGateway()
export class RoomGateWay implements OnModuleInit{

    constructor( @Inject(CACHE_MANAGER) private cacheManager : Cache
        , private questionsService : QuestionsService) {
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
        let curRoom: string = "";

        for (const room of Array.from(client.rooms)) {
            if (room !== client.id) {
                curRoom = room;
            }
        }

        if (curRoom) {
            const questions: Question[] = await this.questionsService.generateRoomQuestion();
            if (questions.length === 0) return; // Prevent errors if no questions

            let currentQuestionIndex = 0;
            let timerCount = 3;
            let interval: NodeJS.Timeout;

            this.server.to(curRoom).emit("currentQuestion", questions[currentQuestionIndex]);

            const gameLoop = () => {
                if (timerCount > 0) {
                    this.server.to(curRoom).emit("timer", timerCount);
                }

                if (timerCount === 0) {
                    currentQuestionIndex++;

                    if (currentQuestionIndex >= questions.length) {
                        clearInterval(interval);
                        return;
                    }


                    this.server.to(curRoom).emit("currentQuestion", questions[currentQuestionIndex]);
                    timerCount = 4; // Reset timer for the next question
                }

                timerCount--;
            };

            interval = setInterval(gameLoop, 1000);
        }
    }


    @SubscribeMessage('test')
    async test( @MessageBody() message  : string){
            await this.cacheManager.set('test', 'fdfdfd');
            const value = await this.cacheManager.get('test')
            console.log(value)
            return message
    }


}