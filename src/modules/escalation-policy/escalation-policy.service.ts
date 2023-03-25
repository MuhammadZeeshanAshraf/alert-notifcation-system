import { Inject, Injectable } from '@nestjs/common';
import { CreateEscalationPolicyDto } from './dto/create-escalation-policy.dto';
import { UpdateEscalationPolicyDto } from './dto/update-escalation-policy.dto';
import { IEscalationPolicyRepository } from './repositories/interfaces/escalation-policy.interface';
import { FindManyOptions } from 'typeorm';
import { EscalationPolicy } from './entities/escalation-policy.entity';
@Injectable()
export class EscalationPolicyService {
  constructor(
    @Inject('IEscalationPolicyRepository')
    private readonly escalationPolicyRepository: IEscalationPolicyRepository,
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

  async getTargetUserByService(serviceId: number){
    const whereOption: FindManyOptions<EscalationPolicy> = {
      where: {
        serviceId: serviceId,
      },
    };
    const policy = await this.escalationPolicyRepository.findOne(whereOption);
    console.log(policy);

  }
}
