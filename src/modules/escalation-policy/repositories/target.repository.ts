import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LEVEL_TYPE } from 'src/common/contants';
import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { Repository } from 'typeorm';
import { PolicyTarget } from '../entities/policy-target.entity';
import { ITargetRepository } from './interfaces/target.interface';

@Injectable()
export class TargetRepository
  extends BaseRepository<PolicyTarget>
  implements ITargetRepository
{
  constructor(
    @InjectRepository(PolicyTarget)
    public readonly repository: Repository<PolicyTarget>,
  ) {
    super(repository);
  }

  getTargetGroupUser(groupId: number, level:string): Promise<PolicyTarget[]> {
    return this.repository.find({
      where: {
        targetGroupId: groupId,
        levelType: LEVEL_TYPE[level]
      },
      relations: {
        user: true,
      },
    });
  }
}
