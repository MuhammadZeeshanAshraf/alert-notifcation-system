import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PAGER_DATABASE_CONNECTION } from 'src/common/contants';
import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { Repository } from 'typeorm';
import { MonitoredService } from '../entities/monitored-service.entity';
import { IMonitoredServiceRepository } from './interfaces/monitored-service.interface';

@Injectable()
export class MonitoredServiceRepository
    extends BaseRepository<MonitoredService>
    implements IMonitoredServiceRepository
{
    constructor(
        @InjectRepository(MonitoredService, PAGER_DATABASE_CONNECTION)
        public readonly repository: Repository<MonitoredService>
    ) {
        super(repository);
    }
}
