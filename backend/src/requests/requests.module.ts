import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenRequest } from '../entities/open_request.entity';
import { Proposal } from '../entities/proposal.entity';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OpenRequest, Proposal])],
  providers: [RequestsService],
  controllers: [RequestsController],
})
export class RequestsModule {}