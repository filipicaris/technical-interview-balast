import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../service/auth.service';

@Injectable()
export class BasicGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header',
      );
    }

    const base64Credentials = authHeader.replace('Basic ', '');
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    );
    const [email, password] = credentials.split(':');

    if (!email || !password) {
      throw new UnauthorizedException('Invalid authentication credentials');
    }

    const user = await this.authService.login(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return true;
  }
}
