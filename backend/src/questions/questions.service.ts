import {Injectable} from '@nestjs/common';
import {Question} from "../entities/question.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateQuestionDto} from "../dtos/createQuestionDto.dto";

@Injectable()
export class QuestionsService {

    constructor(
        @InjectRepository(Question)
        private questionsRepo : Repository<Question>) {}

    async getQuestions() : Promise<Question[]>{

        return await this.questionsRepo.find()
    }

    async generateRoomQuestion() : Promise<Question[]>{
        const questions = await this.getQuestions()
        return questions.sort(()=>{
            return Math.random() -0.5
        }).slice(0 , 6)

    }


     verifyAnswer(userAnswer : string , question : Question) : boolean {
        return userAnswer === question.answer
    }

    async createQuestion(createQuestionDto : CreateQuestionDto) : Promise<Question> {
        const newQuestion = this.questionsRepo.create(createQuestionDto)
        return this.questionsRepo.save(newQuestion)

    }




}
