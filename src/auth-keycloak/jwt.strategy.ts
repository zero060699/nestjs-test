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
      secretOrKey: `-----BEGIN PUBLIC KEY-----
                   MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzpRQF+b5f350WtrAVtqqdxqoVWnWs9YtEbwAlp8yDFAz92iCBqNtg/08WE72PUB5pVHXqZJiYSXET/TzIUsZvuthIwi5+otG7BdI09/L8mvWhWKtcXvQr39tP8ef0xU/+q/W67oxLMK2AM11xsdRwTk9hc1ZgHMa1rk7hGEGTIFiyScF1etn9L7bHvU/6z4HTbY9LievCQacYQxlOzEW0GgIXFGwjnMHig70RhSPcz3JWRw4cJ2h1nvB8w0Pgioi/LZGz265cjnF6mZqpAupDU0ibZ9/j4xGbEJjw6RQje0SIgFmb7azqZdLrg8xRiCS7+F7PAajZ7udJHiP8m+c+QIDAQAB
                  -----END PUBLIC KEY-----`,
      algorithms: ['RS256'],
      issuer: 'https://id.lab.linksafe.vn/realms/dev',
      audience: 'loc-test',
    });
  }
  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.preferred_username,
      roles: payload.realm_access.roles,
    };
  }
}
