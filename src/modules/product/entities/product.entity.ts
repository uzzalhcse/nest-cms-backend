import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Specification } from './specification.entity';
import { Category } from './category.entity';
import { Brand } from './brand.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelName: string;

  // Many-to-One relationship with Brand
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  // Many-to-Many relationship with Category
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Specification, (specification) => specification.product)
  specifications: Specification[];
}
