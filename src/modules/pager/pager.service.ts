import { Inject, Injectable } from '@nestjs/common';
import {
  FindManyOptions
} from 'typeorm';
import { CreatePagerDto } from './dto/create-pager.dto';
import { UpdatePagerDto } from './dto/update-pager.dto';
import { MonitoredService } from './entities/monitored-service.entity';
import { IMonitoredServiceRepository } from './repositories/interfaces/monitored-service.interface';

@Injectable()
export class PagerService {
  constructor(
    @Inject('IMonitoredServiceRepository')
    private readonly monitoredServiceRepository: IMonitoredServiceRepository,
  ) {}

  create(createPagerDto: CreatePagerDto) {
    return 'This action adds a new pager';
  }

  findAll() {
    return this.monitoredServiceRepository.find();
  }

  findOne(id: number) {
    const whereOption: FindManyOptions<MonitoredService> = {
      where: {
          id: id,
      },
  };
    return this.monitoredServiceRepository.findOne(whereOption);
  }

  update(id: number, updatePagerDto: UpdatePagerDto) {
    return `This action updates a #${id} pager`;
  }

  remove(id: number) {
    return `This action removes a #${id} pager`;
  }
}
