import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, createUserSchema } from '../dtos/createUserDto.dto';
import { ZodValidationPipe } from '../customPipes/zodValidationPipe';
import { UsersInterceptor } from '../interceptors/users.interceptors';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseInterceptors(UsersInterceptor)
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() user: createUserDto) {
    await this.userService.createUser(user);
  }
}
