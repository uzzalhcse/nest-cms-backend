import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Category, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @Column({ nullable: true })
  parent_id: number;

  // Many-to-Many relationship with Product
  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];

  @BeforeInsert()
  generateSlug() {
    // Automatically generate the slug from the name
    this.slug = this.generateSlugFromName(this.name);
  }

  public generateSlugFromName(name: string): string {
    // Convert spaces to dashes and make it lowercase
    return name.replace(/\s+/g, '-').toLowerCase();
  }
}
