import { Inject, Injectable } from '@nestjs/common';
import { UtilsService } from 'src/common/utils/UtilsService';
import { FindManyOptions } from 'typeorm';
import { CreateEscalationPolicyDto } from './dto/create-escalation-policy.dto';
import { UpdateEscalationPolicyDto } from './dto/update-escalation-policy.dto';
import { EscalationPolicy } from './entities/escalation-policy.entity';
import { PolicyTarget } from './entities/policy-target.entity';
import { IEscalationPolicyRepository } from './repositories/interfaces/escalation-policy.interface';
import { ITargetRepository } from './repositories/interfaces/target.interface';
@Injectable()
export class EscalationPolicyService {
  constructor(
    @Inject('IEscalationPolicyRepository')
    private readonly escalationPolicyRepository: IEscalationPolicyRepository,
    @Inject('ITargetRepository')
    private readonly targetRepository: ITargetRepository,
  ) {}

  create(createEscalationPolicyDto: CreateEscalationPolicyDto) {
    return 'This action adds a new escalationPolicy';
  }

  findAll() {
    return `This action returns all escalationPolicy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} escalationPolicy`;
  }

  update(id: number, updateEscalationPolicyDto: UpdateEscalationPolicyDto) {
    return `This action updates a #${id} escalationPolicy`;
  }

  remove(id: number) {
    return `This action removes a #${id} escalationPolicy`;
  }

  async getTargetUserByService(serviceId: number): Promise<PolicyTarget[]> {
    const whereOption: FindManyOptions<EscalationPolicy> = {
      where: {
        serviceId: serviceId,
      },
    };
    const policy = await this.escalationPolicyRepository.findOne(whereOption);
    return await this.targetRepository.getTargetGroupUser(policy.targetGroupId);
  }
}
