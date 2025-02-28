import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config'; // If using a config service

@Injectable()
export class WsGuard {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.headers.token;

    if (!token) {
      throw new WsException('Unauthorized: Missing token');
    }

    try {
      const secret = process.env.SECRET; // Ensure you have this in your .env
      if (secret && typeof token === 'string') {
        jwt.verify(token, secret);
      }
      return true;
    } catch (err) {
      throw new WsException('Unauthorized');
    }
  }
}
