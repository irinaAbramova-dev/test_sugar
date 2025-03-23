import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' }, serveClient: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    const data = { ...payload, createdAt: Date.now() };
    await this.chatService.createMessage(data);

    this.logger.log(`Message received: ${data}`);
    this.wss.emit('chat', data);
  }

  afterInit() {
    this.logger.log(`Init WS Server`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket): Promise<void> {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
