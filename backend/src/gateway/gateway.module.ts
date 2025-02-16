import { Module } from '@nestjs/common';
import {RoomGateWay} from "./gateway";
import {QuestionsModule} from "../questions/questions.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Question} from "../entities/question.entity";
import {Proposition} from "../entities/proposition.entity";
import {CacheModule} from "@nestjs/cache-manager";
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import { createKeyv } from '@keyv/redis';

@Module({
    providers : [RoomGateWay] ,
    imports : [QuestionsModule , TypeOrmModule.forFeature([Question , Proposition])]
})
export class GatewayModule {}
