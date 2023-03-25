import { PartialType } from '@nestjs/mapped-types';
import { CreateEscalationPolicyDto } from './create-escalation-policy.dto';

export class UpdateEscalationPolicyDto extends PartialType(CreateEscalationPolicyDto) {}
