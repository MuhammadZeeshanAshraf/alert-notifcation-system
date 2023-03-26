import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';
import { User } from '../escalation-policy/entities/user.entity';

@Injectable()
export class TwilioSmsService {
  adminPhoneNumber: string;
  private readonly client: twilio.Twilio;

  constructor(private readonly configService: ConfigService) {
    this.adminPhoneNumber =
      this.configService.get<string>('ADMIN_PHONE_NUMBER');
    this.client = twilio(
      configService.get('TWILIO_ACCOUNT_SID'),
      configService.get('TWILIO_AUTH_TOKEN'),
    );
  }

  async send(to: string, messages: string) {
    return this.client.messages.create({
      body: messages,
      from: this.adminPhoneNumber,
      to: to,
    });
  }

  async sendSMSToTargetUsers(alertMessage: string, users: any[]) {
    const phoneNumbers = [];
    users.filter((x: User) => {
      if (this.validE164(x.phoneNumber)) {
        phoneNumbers.push(x.phoneNumber);
        return x.phoneNumber;
      }
    });
    console.log('phoneNumbers',phoneNumbers);
    const promises = [];
    for (const phoneNumber of phoneNumbers) {
      promises.push(this.send(phoneNumber, alertMessage));
    }
    await Promise.all(promises);
  }

  validE164(num: string) {
    return /^\+?[1-9]\d{1,14}$/.test(num);
  }
}
