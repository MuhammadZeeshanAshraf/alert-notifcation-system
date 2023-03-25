import { Injectable } from '@nestjs/common';
import { CreateEscalationPolicyDto } from './dto/create-escalation-policy.dto';
import { UpdateEscalationPolicyDto } from './dto/update-escalation-policy.dto';

@Injectable()
export class EscalationPolicyService {
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
}
