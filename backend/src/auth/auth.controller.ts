import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guad';
import { RoleGuard } from '../guards/role-guard';
import { Public } from './public.decorator';
import { Role } from '../decorators/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @Public()
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Get('test')
  @Role('admin')
  @UseGuards(RoleGuard)
  test() {
    return 'dbeb';
  }

  @Public()
  @Post('validate')
  validate(@Body() data: { token: string }) {
    return this.authService.validateToken(data.token);
  }
}
