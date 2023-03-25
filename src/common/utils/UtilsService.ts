import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorModel, HandledErrorModel } from '../types/error';

@Injectable()
export class UtilsService {
  constructor(public configService: ConfigService) {}
  getErrorModel(status: boolean, message: string, error: Error): ErrorModel {
    return new ErrorModel(status, message, error);
  }

  getHandledErrorModel(
    status: boolean,
    message: string,
    error: Error,
  ): HandledErrorModel {
    return new HandledErrorModel(status, message, error);
  }
}
