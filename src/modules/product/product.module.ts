import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { SpecificationService } from './services/specification.service';
import { SpecificationController } from './controllers/specification.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specification } from './entities/specification.entity';
import { Category } from './entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { Brand } from './entities/brand.entity';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './services/brand.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Specification, Category, Brand])
  ],
  controllers: [
    ProductController,
    SpecificationController,
    CategoryController,
    BrandController
  ],
  providers: [
    ProductService,
    SpecificationService,
    CategoryService,
    BrandService
  ],
  exports: [ProductService, SpecificationService, CategoryService, BrandService]
})
export class ProductModule {}
