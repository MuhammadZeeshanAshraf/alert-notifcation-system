import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EscalationPolicy } from "./escalation-policy.entity";
import { User } from "./user.entity";

@Index("acknowledgment_pkey", ["id"], { unique: true })
@Entity("alert_acknowledgments", { schema: "public" })
export class AlertAcknowledgment {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("boolean", { name: "is_acknowledged", default: () => "false" })
  isAcknowledged: boolean;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "update_at",
    default: () => "now()",
  })
  updateAt: Date;

  @Column('integer', {
    name: 'acknowledged_by',
    default: () => '0',
    nullable: false,
  })
  userId: number;

  @Column('integer', {
    name: 'alert_id',
    default: () => '0',
    nullable: false,
  })
  alertId: number;

  @ManyToOne(() => User, (user) => user.alertAcknowledgment)
  @JoinColumn([{ name: "acknowledged_by", referencedColumnName: "id" }])
  acknowledgedBy: User;

  @ManyToOne(
    () => EscalationPolicy,
    (escalationPolicy) => escalationPolicy.alertAcknowledgment
  )
  @JoinColumn([{ name: "alert_id", referencedColumnName: "id" }])
  alert: EscalationPolicy;
}
