import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { Announcement } from "./announcement";
import { Comment } from "./comment.entity";
import { Address } from "./address.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 2 })
  abbreviation: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ length: 150 })
  password: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ type: "date" })
  birthday: string;

  @Column({ length: 8, select: false, nullable: true })
  resetCode: string;

  @Column({ length: 200 })
  descripition: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @Column({ nullable: false })
  seller: boolean;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string | null;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcements: Announcement[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hasRounds: number = getRounds(this.password);
    if (!hasRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}
