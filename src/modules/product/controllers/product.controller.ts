// src/modules/products/controllers/product.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { ApiResponse } from '../../../utils/api-response.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Get()
  @ApiResponse('Product list')
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
  @Get('/seed')
  @ApiResponse('Product seed')
  seed() {
    return this.productService.seed();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProduct: Partial<Product>
  ): Promise<Product> {
    return this.productService.update(Number(id), updateProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(Number(id));
  }
}
