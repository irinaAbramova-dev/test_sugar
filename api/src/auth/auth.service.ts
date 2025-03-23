import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { ConfigService } from '@nestjs/config';
import {InvalidException400, InvalidException404 } from 'src/common/exceptions';
import { BasicResponse } from 'src/common/responses';
import { IAuthentication } from './typings';

const EXPIRE_TIME = 20 * 1000;

function generatePassword(password) {
  const salt = randomBytes(32).toString('hex');
  const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

function validPassword(password, hash, salt) {
  const checkHash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString(
    'hex',
  );
  return hash === checkHash;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new InvalidException404(
          'USER DOES NOT EXIST',
          'User does not exist',
      );
    }

    const payload = { sub: user.id, email: user.email };

    if (!validPassword(password, user?.password, user.salt)) {
      throw new InvalidException400(
          'PASSWORD IS INVALID',
          'Password is invalid',
      );
    }

    return new BasicResponse<IAuthentication>({
      id: user.id,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: this.config.get('auth').jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: this.config.get('auth').jwtRefreshTokenKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    })
  }

  async register(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new InvalidException400(
          'USER ALREADY EXISTS',
          'User is already registered',
      );
    }

    const { hash, salt } = generatePassword(password);
    const newUser = await this.usersService.create(email, hash, salt);

    return;
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: process.env.jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshTokenKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
