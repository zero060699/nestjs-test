import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AuthKeycloakService } from './auth-keycloak.service';

@Controller('auth-keycloak')
export class AuthKeycloakController {
  constructor(private readonly authKeycloakService: AuthKeycloakService) {}
  @Get()
  async getToken() {
    try {
      const token = this.authKeycloakService.getAccessToken();
      return token;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
