import { Module, Global } from '@nestjs/common';
import { EventsService } from './events.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import amqp from 'amqplib';

@Global()
@Module({
  providers: [
    {
      provide: 'RABBITMQ_CONNECTION',
      useFactory: async (config: ConfigService) => {
        const conn = await amqp.connect(`amqp://${config.get('RABBITMQ_HOST') || 'localhost'}:${config.get('RABBITMQ_PORT') || 5672}`);
        return conn;
      },
      inject: [ConfigService],
    },
    EventsService,
  ],
  exports: [EventsService, 'RABBITMQ_CONNECTION'],
})
export class EventsModule {}