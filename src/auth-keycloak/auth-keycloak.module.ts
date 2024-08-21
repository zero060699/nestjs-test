import { Module } from '@nestjs/common';
import { AuthKeycloakService } from './auth-keycloak.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthKeycloakController } from './auth-keycloak.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  providers: [AuthKeycloakService, JwtStrategy],
  exports: [AuthKeycloakService, PassportModule, JwtModule],
  controllers: [AuthKeycloakController],
})
export class AuthKeycloakModule {}
