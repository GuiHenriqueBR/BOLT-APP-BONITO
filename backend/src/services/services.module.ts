import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';
import { ServicePackage } from '../entities/service_package.entity';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Service, ServicePackage])],
  providers: [ServicesService],
  controllers: [ServicesController],
})
export class ServicesModule {}