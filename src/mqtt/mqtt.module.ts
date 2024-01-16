import { Module } from '@nestjs/common';

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { MqttService } from './mqtt.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'x.api',
          type: 'fanout',
        },
      ],
      uri: 'amqp://admin:admin@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [MqttService],
})
export class MqttModule {}
