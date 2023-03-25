import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { PagerService } from '../pager/pager.service';
import { pagerModuleDependeniceRepository } from '../pager/pager.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoredService } from '../pager/entities/monitored-service.entity';
import { PAGER_DATABASE_CONNECTION } from 'src/common/contants';
import { EscalationPolicyService } from '../escalation-policy/escalation-policy.service';
import { escalationPolicyModuleDependeniceRepository } from '../escalation-policy/escalation-policy.module';
import { EscalationPolicy } from '../escalation-policy/entities/escalation-policy.entity';
import { MonitoredService as ESMonitoredService } from '../escalation-policy/entities/monitored-service.entity';
import { User } from '../escalation-policy/entities/user.entity';
import { PolicyTargetGroup } from '../escalation-policy/entities/policy-target-group.entity';
import { PolicyTarget } from '../escalation-policy/entities/policy-target.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EscalationPolicy,
      ESMonitoredService,
      User,
      PolicyTargetGroup,
      PolicyTarget,
    ]),
    TypeOrmModule.forFeature([MonitoredService], PAGER_DATABASE_CONNECTION),
  ],
  controllers: [AlertController],
  providers: [
    AlertService,
    PagerService,
    EscalationPolicyService,
    ...escalationPolicyModuleDependeniceRepository,
    ...pagerModuleDependeniceRepository,
  ],
})
export class AlertModule {}
