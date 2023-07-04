import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Comment } from "./Comment.entity";

@Entity("announcements")
export class Announcement {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 60 })
  model: string;

  @Column({ length: 150 })
  type: string;

  @Column({ nullable: true })
  description: string;

  @Column({ length: 60 })
  km: number;

  @Column({ length: 60 })
  year: number;

  @Column({ length: 220 })
  default_img: string;

  @Column("simple-array")
  images: string[];

  @Column({ type: "float" })
  price: number;

  @Column({ default: "true" })
  isActive: boolean;

  @ManyToOne(() => User, {
    eager: true,
  })
  user: User;

  @OneToMany(() => Comment, (comments) => comments.annoucement, {
    eager: true,
  })
  comments: Comment[];
}