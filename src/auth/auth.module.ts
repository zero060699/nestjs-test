import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        public: `-----BEGIN PUBLIC KEY-----\n${configService.get<string>('PUBLIC')}\n-----END PUBLIC KEY-----`,
        secret: `-----BEGIN PRIVATE KEY-----\n${configService.get<string>('SECRET')}\n-----END PRIVATE KEY-----`,
        signOptions: { expiresIn: '60m', algorithm: 'RS256' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
