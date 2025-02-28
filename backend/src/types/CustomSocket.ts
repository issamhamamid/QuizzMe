import { Socket } from 'socket.io';

export interface CustomSocket extends Socket {
  data: {
    room: string;
    username: string;
  };
}
