import { Module } from '@nestjs/common';
import { EscalationPolicyService } from './escalation-policy.service';
import { EscalationPolicyController } from './escalation-policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscalationPolicy } from './entities/escalation-policy.entity';
import { EscalationPolicyRepository } from './repositories/escalation-policy.repository';
import { UserRepository } from './repositories/user.repository';
import { TargetRepository } from './repositories/target.repository';
import { TargetGroupRepository } from './repositories/target-group.repository';
import { User } from './entities/user.entity';
import { MonitoredService } from './entities/monitored-service.entity';
import { PolicyTargetGroup } from './entities/policy-target-group.entity';
import { PolicyTarget } from './entities/policy-target.entity';

export const escalationPolicyModuleDependeniceRepository = [
  {
    provide: 'IEscalationPolicyRepository',
    useClass: EscalationPolicyRepository,
  },
  {
    provide: 'IUserRepository',
    useClass: UserRepository,
  },
  {
    provide: 'ITargetRepository',
    useClass: TargetRepository,
  },
  {
    provide: 'ITargetGroupRepository',
    useClass: TargetGroupRepository,
  },
];

export const escalationPolicyModuleDependeniceEntities = [
  EscalationPolicy,
  MonitoredService,
  User,
  PolicyTargetGroup,
  PolicyTarget,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([...escalationPolicyModuleDependeniceEntities]),
  ],
  controllers: [EscalationPolicyController],
  providers: [
    ...escalationPolicyModuleDependeniceRepository,
    EscalationPolicyService,
  ],
})
export class EscalationPolicyModule {}
