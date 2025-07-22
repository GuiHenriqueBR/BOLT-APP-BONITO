import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('api/requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get()
  async findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body: any, @Req() req: Request) {
    return this.requestsService.create({ ...body, client: { id: (req.user as any).userId } });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.requestsService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.requestsService.remove(id);
  }

  // Proposals
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/proposals')
  async createProposal(@Param('id') requestId: string, @Req() req: Request, @Body() body: any) {
    return this.requestsService.createProposal(requestId, (req.user as any).userId, body);
  }
}