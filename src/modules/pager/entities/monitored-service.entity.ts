import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EscalationPolicy } from "../../escalation-policy/entities/escalation-policy.entity";
import { PAGER_DATABASE_CONNECTION } from "src/common/contants";

@Index("monitored_service_pkey", ["id"], { unique: true })
@Entity("monitored_services", { schema: "public" , database: PAGER_DATABASE_CONNECTION } )
export class MonitoredService {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" , nullable: false })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("boolean", { name: "is_healthy", default: () => "true" })
  isHealthy: boolean;

  // @OneToMany(
  //   () => EscalationPolicy,
  //   (escalationPolicies) => escalationPolicies.monitoredServiceIdentifier
  // )
  // escalationPolicies: EscalationPolicy[];
}
