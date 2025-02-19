import {Injectable} from '@nestjs/common';
import {Socket} from 'socket.io';
import {WsException} from "@nestjs/websockets";

@Injectable()
export class WebSocketConnectionMiddleware {
    use(socket: Socket, next: (err?: any) => void) {
            socket.data.username = socket.handshake.headers.username;
            next();

    }
}