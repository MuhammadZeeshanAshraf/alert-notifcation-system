import { Inject, Injectable } from '@nestjs/common';
import { UtilsService } from 'src/common/utils/UtilsService';
import { FindManyOptions } from 'typeorm';
import { CreateEscalationPolicyDto } from './dto/create-escalation-policy.dto';
import { UpdateEscalationPolicyDto } from './dto/update-escalation-policy.dto';
import { AlertAcknowledgment } from './entities/alert-acknowledgment.entity';
import { EscalationPolicy } from './entities/escalation-policy.entity';
import { PolicyTarget } from './entities/policy-target.entity';
import { IAlertAcknowledgmentRepository } from './repositories/interfaces/alert-acknowledgment.interface';
import { IEscalationPolicyRepository } from './repositories/interfaces/escalation-policy.interface';
import { ITargetRepository } from './repositories/interfaces/target.interface';
@Injectable()
export class EscalationPolicyService {
  constructor(
    @Inject('IEscalationPolicyRepository')
    private readonly escalationPolicyRepository: IEscalationPolicyRepository,
    @Inject('IAlertAcknowledgmentRepository')
    private readonly alertAcknowledgmentRepository: IAlertAcknowledgmentRepository,
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
    const whereOption: FindManyOptions<EscalationPolicy> = {
      where: {
        id: id,
      },
    };
    return this.escalationPolicyRepository.findOne(whereOption);
  }

  findPolicyByService(serviceId: number) {
    const whereOption: FindManyOptions<EscalationPolicy> = {
      where: {
        serviceId: serviceId,
      },
    };
    return this.escalationPolicyRepository.findOne(whereOption);
  }

  update(id: number, updateEscalationPolicyDto: UpdateEscalationPolicyDto) {
    return `This action updates a #${id} escalationPolicy`;
  }

  remove(id: number) {
    return `This action removes a #${id} escalationPolicy`;
  }

  async getTargetUserByService(serviceId: number, level:string): Promise<PolicyTarget[]> {
    const whereOption: FindManyOptions<EscalationPolicy> = {
      where: {
        serviceId: serviceId,
      },
    };
    const policy = await this.escalationPolicyRepository.findOne(whereOption);
    return await this.targetRepository.getTargetGroupUser(policy.targetGroupId, level);
  }

  async createAlertAcknowledgment(alertId: number,serviceId: number, message: string) {
    const alert = new AlertAcknowledgment();
    alert.alertId = alertId;
    alert.policyId = serviceId;
    alert.message = message;
    return await this.alertAcknowledgmentRepository.create(alert);
  }

  async getUnacknowledgedAlerts(): Promise<AlertAcknowledgment[]> {
    const whereOption: FindManyOptions<AlertAcknowledgment> = {
      where: {
        isAcknowledged: false,
      },
    };
    return this.alertAcknowledgmentRepository.find(whereOption);
  }
}
