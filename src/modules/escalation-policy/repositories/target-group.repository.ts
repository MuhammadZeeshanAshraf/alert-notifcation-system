import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { Repository } from 'typeorm';
import { PolicyTargetGroup } from '../entities/policy-target-group.entity';
import { ITargetGroupRepository } from './interfaces/target-group.interface';

@Injectable()
export class TargetGroupRepository
    extends BaseRepository<PolicyTargetGroup>
    implements ITargetGroupRepository
{
    constructor(
        @InjectRepository(PolicyTargetGroup)
        public readonly repository: Repository<PolicyTargetGroup>
    ) {
        super(repository);
    }
}
