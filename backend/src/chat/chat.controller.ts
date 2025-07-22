import { Controller, Get, Post, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('api/conversations')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getConversations(@Req() req: Request) {
    return this.chatService.getConversations((req.user as any).userId);
  }

  @Get(':id/messages')
  async getMessages(@Param('id') id: string) {
    return this.chatService.getMessages(id);
  }

  @Post(':id/messages')
  async sendMessage(@Param('id') id: string, @Req() req: Request, @Body() body: { receiverId: string; content: string; attachments?: any }) {
    return this.chatService.sendMessage(id, (req.user as any).userId, body.receiverId, body.content, body.attachments);
  }
}