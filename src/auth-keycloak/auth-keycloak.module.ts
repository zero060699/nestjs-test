import { Module } from '@nestjs/common';
import { AuthKeycloakService } from './auth-keycloak.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthKeycloakController } from './auth-keycloak.controller';
import { UsersModule } from '../users/users.module';
import { JwtKeyAuthGuard } from './jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [PassportModule, JwtModule, TypeOrmModule.forFeature([User])],
  providers: [AuthKeycloakService, JwtKeyAuthGuard],
  exports: [AuthKeycloakService, JwtKeyAuthGuard],
  controllers: [AuthKeycloakController],
})
export class AuthKeycloakModule {}
