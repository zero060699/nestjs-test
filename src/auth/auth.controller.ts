import { Controller, Post, Body , HttpException, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new HttpException({ message: 'invalid user or password' }, HttpStatus.BAD_REQUEST);
    }
    return this.authService.login(user);
  }
}
