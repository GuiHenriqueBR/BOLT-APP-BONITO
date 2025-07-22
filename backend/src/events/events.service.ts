import { Injectable, Inject } from '@nestjs/common';
import { Connection as AmqpConnection } from 'amqplib';

@Injectable()
export class EventsService {
  constructor(@Inject('RABBITMQ_CONNECTION') private readonly conn: AmqpConnection) {}

  async publish(queue: string, message: any) {
    const ch = await (this.conn as any).createChannel();
    await ch.assertQueue(queue, { durable: true });
    ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    await ch.close();
  }
}