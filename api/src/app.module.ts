import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import environmentConf from 'src/config/environment';
import { DefaultController } from 'src/default.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exceptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [environmentConf],
      expandVariables: true,
    }),
    AuthModule,
    UsersModule,
    ChatModule,
  ],
  controllers: [DefaultController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
