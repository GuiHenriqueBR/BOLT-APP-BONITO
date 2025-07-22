import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { Raw } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Conversation) private readonly convRepo: Repository<Conversation>,
    @InjectRepository(Message) private readonly msgRepo: Repository<Message>,
  ) {}

  async getConversations(userId: string) {
    return this.convRepo.find({ where: { participants: Raw((alias) => `:${alias} @> ARRAY['${userId}']::uuid[]`) } });
  }

  async getMessages(conversationId: string) {
    return this.msgRepo.find({ where: { conversation: { id: conversationId } }, order: { timestamp: 'ASC' } });
  }

  async sendMessage(conversationId: string, senderId: string, receiverId: string, content: string, attachments?: any) {
    const msg = this.msgRepo.create({ conversation: { id: conversationId }, sender_id: senderId, receiver_id: receiverId, content, attachments });
    await this.msgRepo.save(msg);
    return msg;
  }
}