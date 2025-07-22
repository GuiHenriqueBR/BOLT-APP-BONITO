import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class CacheService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.redis.set(key, value, { EX: ttlSeconds });
    } else {
      await this.redis.set(key, value);
    }
  }
}