import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from '../../shared/services/file-upload.service';
import { GeneratorProvider } from '../../providers';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly fileUploadService: FileUploadService // Inject FileUploadService
  ) {}

  async create(
    createBlogDto: CreateBlogDto,
    thumbnail: Express.Multer.File,
    banner: Express.Multer.File
  ): Promise<Blog> {
    const blog = new Blog();
    blog.title = createBlogDto.title;
    blog.slug = GeneratorProvider.generateSlug(createBlogDto.title);
    blog.description = createBlogDto.description;
    blog.is_published = true;
    blog.user_id = createBlogDto.user_id;

    if (thumbnail) {
      blog.thumbnail = await this.fileUploadService.uploadFile(
        thumbnail,
        'thumbnails'
      );
    }

    if (banner) {
      blog.banner = await this.fileUploadService.uploadFile(banner, 'banners');
    }

    return this.blogRepository.save(blog);
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
