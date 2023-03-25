import { Module } from '@nestjs/common';
import { PagerService } from './pager.service';
import { PagerController } from './pager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoredService } from './entities/monitored-service.entity';
import { PAGER_DATABASE_CONNECTION } from 'src/common/contants';
import { MonitoredServiceRepository } from './repositories/monitored-service.repository';

export const mduleDependeniceRepository = [
  {
    provide: 'IMonitoredServiceRepository',
    useClass: MonitoredServiceRepository,
  },
];
@Module({
  imports: [
    TypeOrmModule.forFeature([MonitoredService], PAGER_DATABASE_CONNECTION),
  ],
  controllers: [PagerController],
  providers: [...mduleDependeniceRepository, PagerService],
})
export class PagerModule {}
