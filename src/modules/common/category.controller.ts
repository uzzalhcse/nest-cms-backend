// category.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponse } from '../../utils/api-response.decorator';
import { Paginable } from '../../decorators/pagination.decorator';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Paginable()
  @ApiResponse('Category List')
  async findAll(@Query() query): Promise<any> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiResponse('Category List')
  async findOne(@Param('id') id: number): Promise<Category> {
    // Get a category by ID
    return this.categoryService.findOne(id);
  }

  @Post()
  @ApiResponse('Category Create')
  async create(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    // Create a new category
    return this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  @ApiResponse('Category Updated Successfully')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    // Update a category by ID
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiResponse('Category Deleted')
  async remove(@Param('id') id: number): Promise<void> {
    // Remove a category by ID
    return this.categoryService.remove(id);
  }
}
