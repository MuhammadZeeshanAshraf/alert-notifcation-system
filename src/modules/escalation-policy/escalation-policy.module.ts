import { Module } from '@nestjs/common';
import { EscalationPolicyService } from './escalation-policy.service';
import { EscalationPolicyController } from './escalation-policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscalationPolicy } from './entities/escalation-policy.entity';
import { EscalationPolicyRepository } from './repositories/escalation-policy.repository';

export const escalationPolicyModuleDependeniceRepository = [
  {
    provide: 'IEscalationPolicyRepository',
    useClass: EscalationPolicyRepository,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([EscalationPolicy])],
  controllers: [EscalationPolicyController],
  providers: [
    ...escalationPolicyModuleDependeniceRepository,
    EscalationPolicyService,
  ],
})
export class EscalationPolicyModule {}
