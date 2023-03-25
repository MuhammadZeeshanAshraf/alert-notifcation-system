import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkServer(): string {
    return 'The Alert Notification Service is Up and Running.';
  }
}
