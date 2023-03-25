import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GroupTypeInterface } from '../interfaces/group-by.interface';
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

  flatternNestObjectArray(targetArray: any[]) {
    const items: any[] = [];
    for (const item of targetArray) {
      items.push(this.flattenObject(item));
    }
    return items;
  }

  flattenObject(obj: any) {
    const flattened = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        if (this.isDate(value)) {
          flattened[key] = value;
        } else {
          Object.assign(flattened, this.flattenObject(value));
        }
      } else {
        flattened[key] = value;
      }
    });
    return flattened;
  }

  isDate(date: string): boolean {
    const output = new Date(date).toString();
    if (output !== 'Invalid Date') {
      return true;
    }
    return false;
  }

  groupByProperty(targetArray: any[], key: string): GroupTypeInterface {
    return targetArray.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}
}
