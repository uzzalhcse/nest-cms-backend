// category.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { PaginationService } from '../../../shared/services/pagination.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly paginationService: PaginationService
  ) {}

  async findAll(): Promise<Category[]> {
    const options: FindManyOptions<Category> = {
      relations: ['parent']
    };

    return this.categoryRepository.find(options);
  }

  async findOne(id: number): Promise<Category> {
    // Find a category by ID in the database
    const category = await this.categoryRepository.findOneBy({ id });

    // Throw an exception if the category is not found
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // Extract data from the DTO
    const { name, parent_id, icon, description } = createCategoryDto;

    // Create a new category entity
    const category = this.categoryRepository.create({
      name,
      parent_id,
      icon,
      description
    });

    // Save the category to the database
    return this.categoryRepository.save(category);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    // Find the category by ID
    const category = await this.findOne(id);

    // Update the category based on the DTO
    if (updateCategoryDto.name) {
      category.name = updateCategoryDto.name;
      category.slug = category.generateSlugFromName(category.name);
    }

    if (updateCategoryDto.parent_id !== undefined) {
      category.parent_id = updateCategoryDto.parent_id;
    }

    if (updateCategoryDto.icon !== undefined) {
      category.icon = updateCategoryDto.icon;
    }

    if (updateCategoryDto.description !== undefined) {
      category.description = updateCategoryDto.description;
    }

    // Save the updated category to the database
    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    // Find the category by ID
    const category = await this.findOne(id);

    // Remove the category from the database
    await this.categoryRepository.remove(category);
  }
}
