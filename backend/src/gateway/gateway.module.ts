import { Module } from '@nestjs/common';
import {RoomGateWay} from "./gateway";
import {QuestionsModule} from "../questions/questions.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Question} from "../entities/question.entity";
import {Proposition} from "../entities/proposition.entity";
import {WebSocketConnectionMiddleware} from "../middlewares/sockets.middleware";

@Module({
    providers : [RoomGateWay , WebSocketConnectionMiddleware ] ,
    imports : [QuestionsModule , TypeOrmModule.forFeature([Question , Proposition])]
})
export class GatewayModule {}
