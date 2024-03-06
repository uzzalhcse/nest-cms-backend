import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  user_id?: number;
}
