// product.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: {
        id
      },
      relations: {
        specifications: true,
        categories: true
      }
    });
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async update(id: number, productData: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, productData);
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
  async seed() {
    const productsToCreate = 50;
    const brands = await this.brandRepository.find();
    const categories = await this.categoryRepository.find();

    const products = [];

    for (let i = 0; i < productsToCreate; i++) {
      const product = new Product();
      product.modelName = `Product ${i + 1}`;

      // Randomly select a brand and assign it to the product
      const randomBrandIndex = Math.floor(Math.random() * brands.length);
      product.brand = brands[randomBrandIndex];

      // Randomly select categories and assign them to the product
      const randomCategoryIndices = Array.from(
        { length: Math.floor(Math.random() * categories.length) },
        () => Math.floor(Math.random() * categories.length)
      );
      product.categories = randomCategoryIndices.map(
        (index) => categories[index]
      );

      products.push(product);
    }

    await this.productRepository.save(products);
    console.log('Products seeded successfully.');
  }
}
