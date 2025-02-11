import {BadRequestException, Injectable} from '@nestjs/common';
import {User} from "../entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {createUserDto} from "../dtos/createUserDto.dto";
import {fromZodError} from "zod-validation-error";
import {ClientError} from "../util/ClientError";
import {throwClientError} from "../util/throwClientError";

@Injectable()
export class UserService {

    constructor( @InjectRepository(User)
                 private userRepository  : Repository<User>
    ) {}

    getUsers() : Promise<User[]>{
        return this.userRepository.find()
    }

    async createUser(createUserDto  : createUserDto)  {
        const users = await this.userRepository.find({
            where : [
                {email : createUserDto.email},
                {username : createUserDto.username }
            ]
        })


        if(users.length > 0){
            let errors : ClientError[] = []
            users.forEach((user)=>{
                if (user.email === createUserDto.email){
                    errors.push(new ClientError("This emails is already in use." , ["email"]) )
                }
                if (user.username === createUserDto.username) {
                    errors.push(new ClientError("This username is already in use." , ["username"]))
                }
            })

            throwClientError(errors  , "Unique constraint Error")

        }

        const newUser =  this.userRepository.create(createUserDto)
        return this.userRepository.save(newUser)
    }



}
