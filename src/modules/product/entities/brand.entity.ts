// brand.entity.ts

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  icon: string;

  // One-to-Many relationship with Product
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
