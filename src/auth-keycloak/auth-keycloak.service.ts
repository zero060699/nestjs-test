import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthKeycloakService {
  constructor(private configService: ConfigService) {}
  async getAccessToken(): Promise<string> {
    const url = `${this.configService.get('KEYCLOAK_ISSUER_URL')}/protocol/openid-connect/token`;
    const response = await axios.post(
      url,
      new URLSearchParams({
        client_id: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
        client_secret: this.configService.get<string>('KEYCLOAK_CLIENT_SECRET'),
        grant_type: 'client_credentials',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data;
  }

  async verifyToken(token: string): Promise<any> {
    const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzpRQF+b5f350WtrAVtqqdxqoVWnWs9YtEbwAlp8yDFAz92iCBqNtg/08WE72PUB5pVHXqZJiYSXET/TzIUsZvuthIwi5+otG7BdI09/L8mvWhWKtcXvQr39tP8ef0xU/+q/W67oxLMK2AM11xsdRwTk9hc1ZgHMa1rk7hGEGTIFiyScF1etn9L7bHvU/6z4HTbY9LievCQacYQxlOzEW0GgIXFGwjnMHig70RhSPcz3JWRw4cJ2h1nvB8w0Pgioi/LZGz265cjnF6mZqpAupDU0ibZ9/j4xGbEJjw6RQje0SIgFmb7azqZdLrg8xRiCS7+F7PAajZ7udJHiP8m+c+QIDAQAB
-----END PUBLIC KEY-----`;
    try {
      const decode = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      return decode;
    } catch (error) {
      throw new UnauthorizedException(error.message, 'Invalid token');
    }
  }
}
