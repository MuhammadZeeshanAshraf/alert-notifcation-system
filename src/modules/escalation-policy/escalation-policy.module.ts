import { Module } from '@nestjs/common';
import { EscalationPolicyService } from './escalation-policy.service';
import { EscalationPolicyController } from './escalation-policy.controller';

@Module({
  controllers: [EscalationPolicyController],
  providers: [EscalationPolicyService]
})
export class EscalationPolicyModule {}
