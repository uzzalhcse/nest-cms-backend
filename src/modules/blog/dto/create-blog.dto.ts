import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  thumbnail: string;
  @IsOptional()
  description?: string;

  @IsOptional()
  user_id?: number;
}
