import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { Repository } from 'typeorm';
import { EscalationPolicy } from '../entities/escalation-policy.entity';
import { IEscalationPolicyRepository } from './interfaces/escalation-policy.interface';

@Injectable()
export class EscalationPolicyRepository
    extends BaseRepository<EscalationPolicy>
    implements IEscalationPolicyRepository
{
    constructor(
        @InjectRepository(EscalationPolicy)
        public readonly repository: Repository<EscalationPolicy>
    ) {
        super(repository);
    }
}
