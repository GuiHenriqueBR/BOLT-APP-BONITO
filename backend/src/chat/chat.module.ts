import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message])],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}