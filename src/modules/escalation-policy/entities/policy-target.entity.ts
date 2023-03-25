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
    enum: ["level_1", "level_2", "level_3"],
  })
  levelType: "level_1" | "level_2" | "level_3";

  @Column("enum", { name: "alert_type", enum: ["SMS", "email"] })
  alertType: "SMS" | "email";

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
