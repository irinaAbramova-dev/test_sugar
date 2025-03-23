import {
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { InvalidTokenException } from 'src/common/exceptions';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new InvalidTokenException('Token is required.');
    }

    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: process.env.jwtRefreshTokenKey,
      });
    } catch {
      throw new InvalidTokenException('Token is invalid.');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}
