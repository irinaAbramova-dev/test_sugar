import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../../prisma/prisma.module';
import {ProfileController, UserController } from './users.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserController, ProfileController],
  providers: [UsersService],
})
export class UsersModule {}
