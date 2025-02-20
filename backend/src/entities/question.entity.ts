import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Proposition} from "./proposition.entity";

@Entity()
export class Question{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    content : string

    @Column()
    answer : string

    @Column()
    type : string

    @Column()
    media_url: string

    @OneToMany(() => Proposition, (proposition) => proposition.question , {
        cascade : true
    })
    propositions: Proposition[]



}