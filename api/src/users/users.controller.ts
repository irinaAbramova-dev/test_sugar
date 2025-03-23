import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ProfileRoute, UsersRoute } from './typings';
import { UsersService } from './users.service';
import { HttpUser } from '../auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(JwtGuard)
@Controller(UsersRoute.Prefix)
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  async handleGetListOfUsers(@HttpUser('sub') userId: string) {
    return await this.userService.getListOfUsers(userId);
  }
}

@UseGuards(JwtGuard)
@Controller(ProfileRoute.Prefix)
export class ProfileController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  async handleGetProfileInfo(@HttpUser('sub') userId: string) {
    return await this.userService.findOneById(userId);
  }
}
