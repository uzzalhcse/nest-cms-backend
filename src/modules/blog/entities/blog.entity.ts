import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  thumbnail: string;

  @Column({ nullable: true })
  banner: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: true })
  is_published: boolean;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
