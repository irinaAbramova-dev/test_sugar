import {
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { InvalidTokenException } from 'src/common/exceptions';
import { IS_PUBLIC_KEY } from '../public.strategy';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new InvalidTokenException('Token is required.');
    }

    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: this.config.get('auth').jwtSecretKey,
      });
    } catch {
      throw new InvalidTokenException('Token is invalid.');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
