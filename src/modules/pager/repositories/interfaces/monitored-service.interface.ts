import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { MonitoredService } from '../../entities/monitored-service.entity';

export interface IMonitoredServiceRepository
    extends BaseRepository<MonitoredService> {
}
