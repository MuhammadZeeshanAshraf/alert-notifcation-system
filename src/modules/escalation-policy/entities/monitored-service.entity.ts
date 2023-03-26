import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EscalationPolicy } from "../../escalation-policy/entities/escalation-policy.entity";
import { PAGER_DATABASE_CONNECTION } from "src/common/contants";
import { AlertAcknowledgment } from "./alert-acknowledgment.entity";

@Index("monitored_service_pkey", ["id"], { unique: true })
@Entity("monitored_services", { schema: "public" } )
export class MonitoredService {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(
    () => EscalationPolicy,
    (escalationPolicies) => escalationPolicies.monitoredServiceIdentifier
  )
  escalationPolicies: EscalationPolicy[];

  @OneToMany(() => AlertAcknowledgment, (alertAcknowledgment) => alertAcknowledgment.monitoredService)
  alertAcknowledgment: AlertAcknowledgment[];
}
