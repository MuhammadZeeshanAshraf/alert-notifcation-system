import { PAGER_DATABASE_CONNECTION } from "src/common/contants";
import {
  Column,
  Entity,
  Index, PrimaryGeneratedColumn
} from "typeorm";

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
}
