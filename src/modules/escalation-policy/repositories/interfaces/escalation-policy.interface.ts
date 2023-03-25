import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { EscalationPolicy } from '../../entities/escalation-policy.entity';

export interface IEscalationPolicyRepository
    extends BaseRepository<EscalationPolicy> {
}
