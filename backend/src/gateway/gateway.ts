import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { Server } from 'socket.io';
import { QuestionsService } from '../questions/questions.service';
import { Question } from '../entities/question.entity';
import Redis from 'ioredis';
import { WebSocketConnectionMiddleware } from '../middlewares/sockets.middleware';
import { CustomSocket } from '../types/CustomSocket';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost'],
  },
})
export class RoomGateWay implements OnGatewayInit, OnGatewayDisconnect {
  private QUESTION_TIME = 15;

  constructor(
    private socketsMiddleware: WebSocketConnectionMiddleware,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    private questionsService: QuestionsService,
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server): any {
    server.use((socket, next) => this.socketsMiddleware.use(socket, next));
  }

  async handleDisconnect(client: CustomSocket): Promise<void> {
    if (!client.data.room) return;
    await this.redisClient.srem(
      `${client.data.room}:players`,
      client.data.username,
    );
    const players = await this.redisClient.smembers(
      `${client.data.room}:players`,
    );
    this.server.to(client.data.room).emit('connected-players', players);
  }

  @SubscribeMessage('create-room')
  async createRoom(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody() data: { roomId: string },
  ) {
    const roomId = data.roomId;
    await client.join(roomId);
    client.data.room = roomId;
    await this.redisClient.sadd(`${roomId}:players`, client.data.username);
    const roomData = {
      room_admin: client.data.username,
    };
    await this.redisClient.hset(`room:${roomId}`, roomData);
    this.server.to(roomId).emit('new-room', roomId);
  }

  @SubscribeMessage('join-room')
  async joinRoom(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody() room: string,
  ) {
    if (client.data.room) {
      throw new WsException('You are already in a room');
    }

    const roomData = await this.redisClient.hgetall(`room:${room}`);

    if (!(Object.keys(roomData).length > 0)) {
      throw new WsException('this room doesnt exist');
    }

    if (roomData.isActive) {
      throw new WsException('The game is already in progress.');
    }

    await client.join(room);
    client.data.room = room;
    await this.redisClient.sadd(`${room}:players`, client.data.username);
    const players = await this.redisClient.smembers(`${room}:players`);
    this.server.to(room).emit('connected-players', players);
  }

  @SubscribeMessage('leave-room')
  async leaveRoom(@ConnectedSocket() client: CustomSocket) {
    if (client.data.room) {
      await this.redisClient.srem(
        `${client.data.room}:players`,
        client.data.username,
      );
      const players = await this.redisClient.smembers(
        `${client.data.room}:players`,
      );
      this.server.to(client.data.room).emit('connected-players', players);
    }
  }

  @SubscribeMessage('start-game')
  async startGame(@ConnectedSocket() client: CustomSocket) {
    const curRoom = client.data.room;

    if (!curRoom) {
      throw new WsException('You arent in a room');
    }

    if (
      !(
        (await this.redisClient.hget(`room:${curRoom}`, 'room_admin')) ===
        client.data.username
      )
    ) {
      throw new WsException('You arent the admin of this room');
    }

    if (curRoom) {
      this.server.to(curRoom).emit('game_start', 'game started');
      const questions: Question[] =
        await this.questionsService.generateRoomQuestion();
      if (questions.length === 0) return; // Prevent errors if no questions
      const roomData = {
        created_at: Date.now(),
        questions: JSON.stringify(questions),
        isActive: true,
        current_question: JSON.stringify(questions[0]),
      };
      await this.redisClient.hset(`room:${curRoom}`, roomData);
      await this.initScores(curRoom);

      let currentQuestionIndex = 0;
      let questionTimer = this.QUESTION_TIME;

      let interval: NodeJS.Timeout;

      this.server
        .to(curRoom)
        .emit('currentQuestion', questions[currentQuestionIndex]);
      let leaderboardShown = false;

      let isProcessing = false; // Flag to check if the game loop is already processing an iteration
      let pauseTimer: null | number = null;

      const gameLoop = async () => {
        if (isProcessing) return; // If an iteration is already in progress, skip this one

        isProcessing = true; // Set flag to indicate processing has started

        if (pauseTimer) {
          pauseTimer--;
        }

        if (
          !leaderboardShown &&
          (questionTimer === 0 || (await this.didEveryoneSubmit(curRoom)))
        ) {
          this.server.to(curRoom).emit('correct-answer', 'correct');

          leaderboardShown = true;
          pauseTimer = 8;
        }

        if (pauseTimer === 5) {
          const new_scores = await this.updateScores(curRoom);
          this.server.to(curRoom).emit('leaderboard', new_scores);
          await this.redisClient.del(`${client.data.room}:answers`);
        }

        if (questionTimer > 0 && pauseTimer === null) {
          this.server.to(curRoom).emit('timer', questionTimer);
          questionTimer--;
        }

        if (pauseTimer === 0) {
          currentQuestionIndex++;

          if (currentQuestionIndex >= questions.length) {
            clearInterval(interval);
            const final_scores = await this.redisClient.hgetall(
              `${curRoom}:scores`,
            );
            this.server.to(curRoom).emit('final_leaderboard', final_scores);
            await this.redisClient.del(`room:${client.data.room}`);
            await this.redisClient.del(`${client.data.room}:players`);
            await this.redisClient.del(`${client.data.room}:scores`);
            await this.redisClient.del(`${client.data.room}:answers`);

            isProcessing = false; // Reset flag when game loop is stopped
            return;
          }

          this.server
            .to(curRoom)
            .emit('currentQuestion', questions[currentQuestionIndex]);
          await this.redisClient.hset(
            `room:${curRoom}`,
            'current_question',
            JSON.stringify(questions[currentQuestionIndex]),
          );

          questionTimer = this.QUESTION_TIME; // Reset timer for the next question
          leaderboardShown = false;
          pauseTimer = null;
        }

        isProcessing = false; // Reset flag after processing the current iteration
      };

      interval = setInterval(gameLoop, 1000);
    }
  }

  @SubscribeMessage('submit-answer')
  async submitAnswer(
    @MessageBody() answer: string,
    @ConnectedSocket() client: CustomSocket,
  ) {
    const curRoom = client.data.room;
    if (
      curRoom &&
      (await this.redisClient.hget(`room:${curRoom}`, 'isActive'))
    ) {
      await this.redisClient.hset(
        `${curRoom}:answers`,
        `${client.data.username}`,
        answer,
      );
    } else {
      throw new WsException('You arent in a room');
    }
  }

  async didEveryoneSubmit(curRoom: string): Promise<boolean> {
    const answers = await this.redisClient.hgetall(`${curRoom}:answers`);
    const submittedArray = Object.keys(answers);
    const roomPlayers = await this.redisClient.smembers(`${curRoom}:players`);
    return submittedArray.length === roomPlayers.length;
  }

  async initScores(curRoom: string) {
    const roomPlayers = await this.redisClient.smembers(`${curRoom}:players`);
    for (const player of roomPlayers) {
      await this.redisClient.hset(`${curRoom}:scores`, `${player}`, 0);
    }
  }

  async updateScores(curRoom: string) {
    const usersAnswers = await this.redisClient.hgetall(`${curRoom}:answers`);
    const current_question = await this.redisClient.hget(
      `room:${curRoom}`,
      'current_question',
    );
    const parsedQuestion: Question = current_question
      ? JSON.parse(current_question)
      : null;
    for (const user in usersAnswers) {
      if (
        this.questionsService.verifyAnswer(usersAnswers[user], parsedQuestion)
      ) {
        await this.redisClient.hincrby(`${curRoom}:scores`, `${user}`, 10);
      }
    }
    return this.redisClient.hgetall(`${curRoom}:scores`);
  }
}
