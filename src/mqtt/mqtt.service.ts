import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ConsumeMessage, Channel } from 'amqplib';

@Injectable()
export class MqttService {
  @RabbitSubscribe({
    exchange: 'x.api',
    routingKey: 'x.routing.#',
    queue: 'q.api',
    errorHandler: (channel: Channel, msg: ConsumeMessage, error: Error) => {
      console.log(`msg === ${JSON.stringify(msg)}`);
      console.log(`test ============${error}`);
      channel.reject(msg, false); // use error handler, or otherwise app will crush in not intended way
    },
  })
  public async pubSubHandler(msg: {}, amqpMsg: ConsumeMessage) {
    const eventData1 = JSON.parse(amqpMsg.content.toString());
    // do something with eventData
    console.log(`EventData: ${eventData1.roundKey}, successfully consumed!`);
  }
}
