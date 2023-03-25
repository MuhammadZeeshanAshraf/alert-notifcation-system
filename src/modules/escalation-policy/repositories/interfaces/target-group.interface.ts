import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { PolicyTargetGroup } from '../../entities/policy-target-group.entity';

export interface ITargetGroupRepository
    extends BaseRepository<PolicyTargetGroup> {
        
}
