// update-category.dto.ts

import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  icon?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  parent_id?: number;
}
