import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {UserRole} from "../types/UserRole";

@Entity()
@Unique(['email', 'username'])


export class User {
    @PrimaryGeneratedColumn()
    id : number

    @Column()

    full_name : string

    @Column()
    username : string

    @Column()
    password : string

    @Column()
    email : string

    @Column(
        {
            type: "enum",
            enum: UserRole,
            default: UserRole.USER,
        }
    )
    role : "admin" | "user"
}

