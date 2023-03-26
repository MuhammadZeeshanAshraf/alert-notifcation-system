import { ALERT_TYPE, LEVEL_TYPE } from "src/common/contants";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PolicyTargetGroup } from "./policy-target-group.entity";
import { User } from "./user.entity";

@Index("policy_targets_pkey", ["id"], { unique: true })
@Entity("policy_targets", { schema: "public" })
export class PolicyTarget {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("enum", {
    name: "level_type",
    enum: LEVEL_TYPE,
  })
  levelType: LEVEL_TYPE;

  @Column("enum", { name: "alert_type", enum: ALERT_TYPE })
  alertType: ALERT_TYPE;

  @Column('integer', {
    name: 'target_group_id',
    default: () => '0',
    nullable: false,
  })
  targetGroupId: number;

  @Column('integer', {
    name: 'user_id',
    default: () => '0',
    nullable: false,
  })
  userId: number;

  @ManyToOne(
    () => PolicyTargetGroup,
    (policyTargetGroup) => policyTargetGroup.policyTargets
  )
  @JoinColumn([{ name: "target_group_id", referencedColumnName: "id" }])
  targetGroup: PolicyTargetGroup;

  @ManyToOne(() => User, (users) => users.policyTargets)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
