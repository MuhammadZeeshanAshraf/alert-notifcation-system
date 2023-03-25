import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { AlertAcknowledgment } from '../../entities/alert-acknowledgment.entity';

export interface IAlertAcknowledgmentRepository
    extends BaseRepository<AlertAcknowledgment> {
        
}
