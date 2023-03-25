import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AlertAcknowledgment } from "./alert-acknowledgment.entity";
import { PolicyTarget as PolicyTarget } from "./policy-target.entity";

@Index("unique_email", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
@Index("unique_phone_number", ["phoneNumber"], { unique: true })
@Entity("users", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("character varying", {
    name: "phone_number",
    unique: true,
    length: 255,
  })
  phoneNumber: string;

  @OneToMany(() => PolicyTarget, (policyTargets) => policyTargets.user)
  policyTargets: PolicyTarget[];

  @OneToMany(() => AlertAcknowledgment, (alertAcknowledgment) => alertAcknowledgment.acknowledgedBy)
  alertAcknowledgment: AlertAcknowledgment[];
}
