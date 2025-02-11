import {Controller, Post, UseGuards, Req} from '@nestjs/common';
import { Request } from 'express';
import {AuthService} from "./auth.service";
import {LocalGuard} from "../guards/local.guad";

@Controller('auth')
export class AuthController {
constructor(private authService : AuthService) {
}

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Req() req :Request) {
        return this.authService.login(req.user);
    }
}