import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  async findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body: any) {
    return this.bookingsService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.bookingsService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}