import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlertAcknowledgment } from './alert-acknowledgment.entity';
import { MonitoredService } from './monitored-service.entity';
import { PolicyTargetGroup } from './policy-target-group.entity';

@Index('escalation_policies_pkey', ['id'], { unique: true })
@Entity('escalation_policies', { schema: 'public' })
export class EscalationPolicy {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('integer', {
    name: 'monitored_service_identifier',
    default: () => '0',
    nullable: false,
  })
  serviceId: number;

  @Column('integer', {
    name: 'target_group_id',
    default: () => '0',
    nullable: false,
  })
  targetGroupId: number;

  @ManyToOne(
    () => MonitoredService,
    (monitoredService) => monitoredService.escalationPolicies,
  )
  @JoinColumn([
    { name: 'monitored_service_identifier', referencedColumnName: 'id' },
  ])
  monitoredServiceIdentifier: MonitoredService;

  @ManyToOne(
    () => PolicyTargetGroup,
    (policyTargetGroup) => policyTargetGroup.escalationPolicies,
  )
  @JoinColumn([{ name: 'target_group_id', referencedColumnName: 'id' }])
  targetGroup: PolicyTargetGroup;

  @OneToMany(
    () => PolicyTargetGroup,
    (policyTargetGroup) => policyTargetGroup.policy,
  )
  policyTargetGroups: PolicyTargetGroup[];

  @OneToMany(() => AlertAcknowledgment, (alertAcknowledgment) => alertAcknowledgment.alert)
  alertAcknowledgment: AlertAcknowledgment[];
}
