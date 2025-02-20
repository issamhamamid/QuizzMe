import {Controller, Post, UsePipes} from '@nestjs/common';
import {QuestionsService} from "./questions.service";
import {MessageBody} from "@nestjs/websockets";
import {CreateQuestionDto, createQuestionSchema} from "../dtos/createQuestionDto.dto";
import {ZodValidationPipe} from "../customPipes/zodValidationPipe";

@Controller('questions')
export class QuestionsController {

    constructor(private questionService : QuestionsService) {
    }


    @Post()
    @UsePipes(new ZodValidationPipe(createQuestionSchema))
    async createQuestion(@MessageBody() question : CreateQuestionDto){
        await this.questionService.createQuestion(question)
    }

}
