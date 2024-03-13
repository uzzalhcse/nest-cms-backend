import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Specification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group: string;

  @Column()
  key: string;

  @Column()
  value: string;

  // Add other properties as needed
}
