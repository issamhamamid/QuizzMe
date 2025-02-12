import {Controller, Get, Post, UseGuards , Request} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth/auth.service";
import {LocalGuard} from "./guards/local.guad";

@Controller()
export class AppController {


    getHello() {
        return undefined;
    }
}
