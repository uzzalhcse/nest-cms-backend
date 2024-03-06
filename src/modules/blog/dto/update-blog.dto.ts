import { PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { IsOptional } from 'class-validator';
import { IFile } from '../../../interfaces';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsOptional()
  thumbnail: IFile;

  @IsOptional()
  banner: IFile;
}
