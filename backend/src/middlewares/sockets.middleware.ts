import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class WebSocketConnectionMiddleware {
  use(socket: Socket, next: (err?: any) => void) {
    const token = socket.handshake.headers.token;
    if (!token) {
      return next(new WsException('Unauthorized: Missing token'));
    }

    try {
      const secret = process.env.SECRET; // Ensure you have this in your .env
      if (secret && typeof token === 'string') {
        jwt.verify(token, secret);
      }
      socket.data.username = socket.handshake.headers.username;
      next();
    } catch (err) {
      return next(new WsException('Unauthorized'));
    }
  }
}
