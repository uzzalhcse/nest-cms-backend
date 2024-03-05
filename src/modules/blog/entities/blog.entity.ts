import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

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

  @Column({ default: true })
  user_id: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
