import {Injectable} from '@nestjs/common';
import {User} from "../entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {createUserDto} from "../dtos/createUserDto.dto";

@Injectable()
export class UserService {

    constructor( @InjectRepository(User)
                 private userRepository  : Repository<User>
    ) {}

    getUsers() : Promise<User[]>{
        return this.userRepository.find()
    }

    createUser(createUserDto  : createUserDto)  {
        const newUser =  this.userRepository.create(createUserDto)
        return this.userRepository.save(newUser)
    }

}
