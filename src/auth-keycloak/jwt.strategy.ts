import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('KEYCLOAK_PUBLIC_KEY'),
      algorithms: ['RS256'],
      issuer: configService.get<string>('KEYCLOAK_ISSUER_URL'),
      audience: configService.get<string>('KEYCLOAK_CLIENT_ID'),
    });
  }
  async validate(payload: any) {
    console.log(payload);
    return {
      userId: payload.sub,
      username: payload.preferred_username,
      roles: payload.realm_access.roles,
    };
  }
}
