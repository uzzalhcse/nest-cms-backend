// brand.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { GeneratorProvider } from '../../../providers';
import { IFile } from '../../../interfaces';
import { FileNotImageException } from '../../../exceptions';
import { ValidatorService } from '../../../shared/services/validator.service';
import { FileUploadService } from '../../../shared/services/file-upload.service';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private validatorService: ValidatorService,
    private readonly fileUploadService: FileUploadService
  ) {}

  async findAll(withProducts: boolean = false): Promise<Brand[]> {
    return this.brandRepository.find({
      relations: {
        products: withProducts
      }
    });
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  async create(createBrandDto: CreateBrandDto, file: IFile): Promise<Brand> {
    const slug = GeneratorProvider.generateSlug(createBrandDto.name);
    const existingBrand = await this.brandRepository.findOne({
      where: { slug }
    });
    if (existingBrand) {
      throw new BadRequestException('Brand with this name already exists');
    }
    const brand = new Brand();
    brand.name = createBrandDto.name;
    brand.slug = slug;
    if (file && !this.validatorService.isImage(file.mimetype)) {
      throw new FileNotImageException();
    }
    if (file) {
      brand.icon = await this.fileUploadService.uploadFile(file, 'icons');
    }

    const payload = this.brandRepository.create(brand);
    return this.brandRepository.save(payload);
  }

  async update(
    id: number,
    updateBrandDto: UpdateBrandDto,
    file: IFile
  ): Promise<Brand> {
    // Check if the brand exists
    const brand = await this.findOne(id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    // Check if the brand name has changed
    if (updateBrandDto.name !== brand.name) {
      // Update the brand name and slug
      brand.name = updateBrandDto.name;
      brand.slug = GeneratorProvider.generateSlug(updateBrandDto.name);
    }

    // Update the brand entity with the provided data
    Object.assign(brand, updateBrandDto);

    // Handle file upload if provided
    if (file) {
      if (!this.validatorService.isImage(file.mimetype)) {
        throw new FileNotImageException();
      }
      brand.icon = await this.fileUploadService.uploadFile(file, 'icons');
    }

    // Save the updated brand entity
    return this.brandRepository.save(brand);
  }

  async remove(id: number): Promise<void> {
    const brand = await this.findOne(id);
    await this.brandRepository.remove(brand);
  }

  async seed() {
    const brandsToCreate = 50;
    const brands = [];

    for (let i = 0; i < brandsToCreate; i++) {
      const brand = new Brand();
      brand.name = `Brand ${i + 1}`;
      brand.slug = GeneratorProvider.generateSlug(brand.name);
      brand.icon = '/public/uploads/icons/default.png';
      // Set other properties as needed
      brands.push(brand);
    }

    await this.brandRepository.save(brands);
    console.log(`${brands.length} brands seeded successfully.`);
  }
}
