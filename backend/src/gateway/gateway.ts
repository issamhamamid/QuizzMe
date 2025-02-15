import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {OnModuleInit} from "@nestjs/common";
import  {Server , Socket} from 'socket.io'


@WebSocketGateway()
export class RoomGateWay implements OnModuleInit{

    @WebSocketServer()
    server : Server

    onModuleInit() {
         this.server.on('connection' , (socket)=>{

             })
    }

    @SubscribeMessage('join-room')
    async joinRoom(@ConnectedSocket() client  : Socket , @MessageBody() data : any ){
            Array.from(client.rooms).forEach((room)=>{
                if(room!== client.id){
                    client.leave(room)
                }

            })
            await client.join(data.room)
            this.server.to(data.room).emit("joining" , `${data.username} joined the room`)
    }

    @SubscribeMessage('leave-room')
    async leaveRoom(@ConnectedSocket() client : Socket , @MessageBody() username :string){
        let curRoom: string = "";

        for (const room of Array.from(client.rooms)) {
            if (room !== client.id) {
                await client.leave(room);
                curRoom = room;
            }
        }

        console.log(curRoom);
        this.server.to(curRoom).emit("leaving" , `${username} left the room`)
    }

}