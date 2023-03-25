import { Module } from '@nestjs/common';
import { TwilioSmsService } from './twilio-sms.service';
import { TwilioSmsController } from './twilio-sms.controller';
import { TwilioModule, TwilioService } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [TwilioSmsController],
  providers: [TwilioSmsService,TwilioService]
})
export class TwilioSmsModule {}
