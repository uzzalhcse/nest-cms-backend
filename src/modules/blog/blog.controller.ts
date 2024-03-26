import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { ApiFile } from '../../decorators';
import { IFile } from '../../interfaces';
import { ApiResponse } from '../../utils/api-response.decorator';
import { Paginable } from '../../decorators/pagination.decorator';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiResponse('Blog Created')
  @ApiFile({ name: 'thumbnail' })
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() thumbnail: IFile
  ): Promise<Blog> {
    return this.blogService.create(createBlogDto, thumbnail);
  }

  @Get()
  @Paginable()
  @ApiResponse('Blog List')
  findAll() {
    return this.blogService.findAll();
  }

  @Get('/seed')
  seed() {
    return this.blogService.seed();
  }
  @Get(':id')
  @ApiResponse('Blog info')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Put(':id')
  @ApiFile({ name: 'thumbnail' })
  @ApiResponse('Blog Updated')
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() thumbnail: IFile
  ) {
    return this.blogService.update(+id, updateBlogDto, thumbnail);
  }

  @Delete(':id')
  @ApiResponse('Blog Deleted')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
