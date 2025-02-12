import {Controller, Post, UseGuards, Req, Get} from '@nestjs/common';
import { Request } from 'express';
import {AuthService} from "./auth.service";
import {LocalGuard} from "../guards/local.guad";
import {JwtAuthGuard} from "../guards/jwt-guard";

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