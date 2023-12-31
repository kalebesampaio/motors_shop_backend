import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";
import { Announcement } from "./announcement";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 240 })
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  user: User;

  @ManyToOne(() => Announcement, (announcement) => announcement.comments)
  annoucement: Announcement;
}
