import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity';
import { verifyPassword } from '../util/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }) {
    const user: User | null = await this.userService.findById(username);
    if (user && (await verifyPassword(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  validateToken(token: string): { isValid: boolean } {
    try {
      this.jwtService.verify(token);
      return {
        isValid: true,
      };
    } catch (err) {
      return {
        isValid: false,
      };
    }
  }
}
