import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({ host: 'localhost', port: 6379 }); // Change host/port if needed
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
