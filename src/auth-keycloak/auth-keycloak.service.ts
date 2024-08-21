import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

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
    return response.data.access_token;
  }
}
