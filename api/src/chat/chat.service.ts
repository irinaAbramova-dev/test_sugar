import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { IMessage } from './typings';
import { BasicResponse } from 'src/common/responses';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createMessage(data: any) {
    try {
      return await this.prisma.messages.create({
        data: {
          id: uuidv4(),
          author: data.author,
          recipient: data.recipient,
          text: data.text,
          date_created: new Date(data.createdAt).toISOString(),
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getMessages(userId: string, recipientId: string) {
    try {
      const messages = await this.prisma.messages.findMany({
        where: {
          OR: [
            {
              author: {
                equals: userId,
              },
              recipient: {
                equals: recipientId,
              },
            },
            {
              author: {
                equals: recipientId,
              },
              recipient: {
                equals: userId,
              },
            },
          ],
        },
      }) as IMessage[];

      return new BasicResponse<IMessage[]>(messages)
    } catch (err) {
      return new BasicResponse<[]>([])
    }
  }
}
