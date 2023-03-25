import { Module } from '@nestjs/common';
import { PagerService } from './pager.service';
import { PagerController } from './pager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoredService } from './entities/monitored-service.entity';
import { PAGER_DATABASE_CONNECTION } from 'src/common/contants';
import { MonitoredServiceRepository } from './repositories/monitored-service.repository';

export const pagerModuleDependeniceRepository = [
  {
    provide: 'IMonitoredServiceRepository',
    useClass: MonitoredServiceRepository,
  },
];

export const pagerModuleDependeniceEntities = [MonitoredService];

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [...pagerModuleDependeniceEntities],
      PAGER_DATABASE_CONNECTION,
    ),
  ],
  controllers: [PagerController],
  providers: [...pagerModuleDependeniceRepository, PagerService],
})
export class PagerModule {}
