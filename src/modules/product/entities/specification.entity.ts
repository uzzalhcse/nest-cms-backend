import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

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

  @ManyToOne(() => Product, (product) => product.specifications)
  product: Product;
}
