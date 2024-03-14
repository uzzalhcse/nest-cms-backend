// create-category.dto.ts

import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  icon?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  parent_id?: number; // Allow parentId to be optional for top-level categories
}
