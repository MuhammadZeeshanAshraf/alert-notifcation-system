import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EscalationPolicy } from "./escalation-policy.entity";
import { PolicyTarget } from "./policy-target.entity";

@Index("policy_target_group_pkey", ["id"], { unique: true })
@Entity("policy_target_groups", { schema: "public" })
export class PolicyTargetGroup {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @OneToMany(
    () => EscalationPolicy,
    (escalationPolicies) => escalationPolicies.targetGroup
  )
  escalationPolicies: EscalationPolicy[];

  @ManyToOne(
    () => EscalationPolicy,
    (escalationPolicies) => escalationPolicies.policyTargetGroups
  )
  @JoinColumn([{ name: "policy_id", referencedColumnName: "id" }])
  policy: EscalationPolicy;

  @OneToMany(() => PolicyTarget, (policyTargets) => policyTargets.targetGroup)
  policyTargets: PolicyTarget[];
}
