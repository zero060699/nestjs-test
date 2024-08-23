import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthKeycloakModule } from 'src/auth-keycloak/auth-keycloak.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthKeycloakModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
