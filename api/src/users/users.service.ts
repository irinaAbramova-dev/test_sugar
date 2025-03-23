import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { IUser, IProfile } from './typings';
import { BasicResponse } from 'src/common/responses/basic.response';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(email, password, salt) {
    try {
      return await this.prisma.users.create({
        data: {
          id: uuidv4(),
          email,
          password,
          salt,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOneByEmail(email: string): Promise<any | undefined> {
    try {
      return await this.prisma.users.findFirstOrThrow({
        where: { email },
      });
    } catch (err) {
      return null;
    }
  }

  async findOneById(id: string): Promise<any | undefined> {
    try {
      const user = await this.prisma.users.findFirstOrThrow({
        select: {
          email: true
        },
        where: { id },
      }) as IUser;

      return new BasicResponse<IProfile>({...user, subscription: false})
    } catch (err) {
      throw new Error(err);
    }
  }

  async getListOfUsers(id: string): Promise<any | undefined> {
    try {
      const users = await this.prisma.users.findMany({
        select: {
          id: true,
          email: true,
        },
        where: {
          id: {
            not: id,
          },
        },
      }) as IUser[];

      return new BasicResponse<IUser[]>(users)
    } catch (err) {
      console.log(err);
      return new BasicResponse<[]>([])
    }
  }
}
