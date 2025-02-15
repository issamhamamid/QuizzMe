import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./question.entity";

@Entity()
export class Proposition {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    content:string

    @ManyToOne(()=>Question , (question)=>question.propositions)
    question : Question
}
