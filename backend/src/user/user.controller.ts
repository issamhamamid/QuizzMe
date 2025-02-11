import {Body, Controller, Get, Post, UsePipes} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "../entities/user.entity";
import {createUserDto, createUserSchema} from "../dtos/createUserDto.dto";
import {ZodValidationPipe} from "../customPipes/zodValidationPipe";

@Controller('users')
export class UserController {

    constructor(private userService : UserService) {}

    @Get()
    async getUsers() {
        return await this.userService.getUsers()
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createUserSchema))
    async createUser(@Body() user : createUserDto){
        return await this.userService.createUser(user)
    }

}
