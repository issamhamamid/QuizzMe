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
    joinRoom(@ConnectedSocket() client  : Socket , @MessageBody() data : any ){
            client.join(data.room)
            this.server.to(data.room).emit("joining" , `${data.username} joined the room`)
    }

}