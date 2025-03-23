import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ChatRoute } from './typings';
import { HttpUser } from '../auth/user.decorator';
import { ChatService } from './chat.service';

@UseGuards(JwtGuard)
@Controller(ChatRoute.Prefix)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/:recipientId')
  async handleGetMessages(
    @Param('recipientId') recipientId: string,
    @HttpUser('sub') userId: string,
  ) {
    return await this.chatService.getMessages(userId, recipientId);
  }
}
