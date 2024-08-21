import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtKeyAuthGuard extends AuthGuard('jwt') {}
