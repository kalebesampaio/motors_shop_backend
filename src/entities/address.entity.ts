import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 8 })
  cep: string;

  @Column({ length: 64 })
  state: string;

  @Column({ length: 64 })
  city: string;

  @Column({ length: 12 })
  number: string;

  @Column()
  complement: string;
}
