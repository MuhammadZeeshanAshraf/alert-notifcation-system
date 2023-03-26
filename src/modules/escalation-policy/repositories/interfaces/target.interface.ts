import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { PolicyTarget } from '../../entities/policy-target.entity';

export interface ITargetRepository extends BaseRepository<PolicyTarget> {
  getTargetGroupUser(id: number, level:string): Promise<PolicyTarget[]>;
}
