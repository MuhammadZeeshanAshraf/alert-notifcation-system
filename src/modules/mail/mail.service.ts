import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { User } from '../escalation-policy/entities/user.entity';

@Injectable()
export class MailService {
  adminEmail: string;
  constructor(public readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
    this.adminEmail = this.configService.get<string>('ADMIN_EMAIL');
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    return transport;
  }

  async sendEmailToTargetUsers(
    serviceName: string,
    alertMessage: string,
    users: any[],
  ): Promise<[SendGrid.ClientResponse, {}]> {
    console.log(this.adminEmail);
    const emails = users.map((x: User) => {
      return x.email;
    });
    const mail = {
      to: emails,
      subject: `Monitored Service ${serviceName} Escalation Alert`,
      from: this.adminEmail,
      text: alertMessage,
    };
    return await this.send(mail);
  }
}
