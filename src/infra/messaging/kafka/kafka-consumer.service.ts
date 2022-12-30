import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {

  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['infinite-muskrat-11810-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: 'aW5maW5pdGUtbXVza3JhdC0xMTgxMCROxZxK-AVrB8kYukDmsHcoaGslsFeu6bk',
          password: 'b60a33a9664e40a399a9843ea9a458dd',
        },
        ssl: true,
      }
    });
  }
  
  async onModuleDestroy() {
    await this.close();
  }
}