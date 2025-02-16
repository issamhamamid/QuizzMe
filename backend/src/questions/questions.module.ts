import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Question} from "../entities/question.entity";
import {Proposition} from "../entities/proposition.entity";

@Module({
  providers: [QuestionsService],
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionsController] ,
  exports : [QuestionsService]
})
export class QuestionsModule {}
