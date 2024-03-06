import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { FileUploadService } from '../../shared/services/file-upload.service';
import { GeneratorProvider } from '../../providers';
import { IFile } from '../../interfaces';
import { ValidatorService } from '../../shared/services/validator.service';
import { FileNotImageException } from '../../exceptions';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly fileUploadService: FileUploadService,
    private validatorService: ValidatorService
  ) {}

  async create(createBlogDto: CreateBlogDto, file: IFile): Promise<Blog> {
    const blog = new Blog();
    blog.title = createBlogDto.title;
    blog.slug = GeneratorProvider.generateSlug(createBlogDto.title);
    blog.description = createBlogDto.description;
    blog.is_published = true;
    blog.user_id = createBlogDto.user_id;
    if (file && !this.validatorService.isImage(file.mimetype)) {
      throw new FileNotImageException();
    }
    if (file) {
      blog.thumbnail = await this.fileUploadService.uploadFile(
        file,
        'thumbnails'
      );
    }
    const payload = this.blogRepository.create(blog);

    return this.blogRepository.save(payload);
  }

  findAll() {
    const options: FindManyOptions<Blog> = {
      relations: ['user']
    };

    return this.blogRepository.find(options);
  }

  async findOne(id: number): Promise<Blog> {
    // Find a blog by ID in the database
    const blog = await this.blogRepository.findOneBy({ id });

    // Throw an exception if the blog is not found
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return blog;
  }

  async update(
    id: number,
    updateBlogDto: UpdateBlogDto,
    thumbnail: IFile
  ): Promise<Blog> {
    // Find the existing blog by ID
    const existingBlog = await this.findOne(id);

    // Update the properties of the existing blog with values from updateBlogDto
    existingBlog.title = updateBlogDto.title || existingBlog.title;
    existingBlog.slug = updateBlogDto.title
      ? GeneratorProvider.generateSlug(updateBlogDto.title)
      : existingBlog.slug;
    existingBlog.description =
      updateBlogDto.description || existingBlog.description;

    // Check if there is a new thumbnail file in the update
    if (thumbnail) {
      // Validate if the new file is an image
      if (!this.validatorService.isImage(thumbnail.mimetype)) {
        throw new FileNotImageException();
      }

      // Upload the new thumbnail and update the blog entity
      existingBlog.thumbnail = await this.fileUploadService.uploadFile(
        thumbnail,
        'thumbnails'
      );
    }

    // Save the updated blog entity back to the database
    // Return the updated blog
    return await this.blogRepository.save(existingBlog);
  }

  async remove(id: number): Promise<void> {
    // Find the blog by ID
    const blog = await this.findOne(id);

    // Remove the blog from the database
    await this.blogRepository.remove(blog);
  }
}
