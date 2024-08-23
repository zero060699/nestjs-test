import { Injectable, CanActivate, UnauthorizedException,ExecutionContext } from '@nestjs/common';
import { AuthKeycloakService } from './auth-keycloak.service';

@Injectable()
export class JwtKeyAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthKeycloakService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header found');
    }
    const [, token] = authHeader.split(' ');
    try {
      await this.authService.verifyToken(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
