import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Req() req: Request) {
    return this.usersService.getMe((req.user as any).userId);
  }

  @Put('me')
  async updateMe(@Req() req: Request, @Body() body: { name?: string; phone?: string; city?: string }) {
    return this.usersService.updateMe((req.user as any).userId, body);
  }

  @Put('me/password')
  async updatePassword(@Req() req: Request, @Body() body: { currentPassword: string; newPassword: string }) {
    return this.usersService.updatePassword((req.user as any).userId, body.currentPassword, body.newPassword);
  }
}