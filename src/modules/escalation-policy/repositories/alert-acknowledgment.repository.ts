import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { Repository } from 'typeorm';
import { AlertAcknowledgment } from '../entities/alert-acknowledgment.entity';
import { IAlertAcknowledgmentRepository } from './interfaces/alert-acknowledgment.interface';

@Injectable()
export class AlertAcknowledgmentRepository
    extends BaseRepository<AlertAcknowledgment>
    implements IAlertAcknowledgmentRepository
{
    constructor(
        @InjectRepository(AlertAcknowledgment)
        public readonly repository: Repository<AlertAcknowledgment>
    ) {
        super(repository);
    }
}
