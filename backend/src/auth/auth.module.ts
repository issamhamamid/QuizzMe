import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "./local.strategy";

@Module({
  providers: [AuthService , LocalStrategy],
  controllers: [AuthController],
  imports: [UserModule , PassportModule , JwtModule.register({
    secret: 'test',
    signOptions: { expiresIn: '60s' },
  }),],
  exports : [AuthService]
})
export class AuthModule {}
