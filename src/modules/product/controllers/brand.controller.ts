// brand.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile
} from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { ApiResponse } from '../../../utils/api-response.decorator';
import { ApiFile } from '../../../decorators';
import { IFile } from '../../../interfaces';
import { Paginable } from '../../../decorators/pagination.decorator';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @Paginable()
  @ApiResponse('Brand List')
  async findAll(): Promise<Brand[]> {
    return this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Brand> {
    return this.brandService.findOne(id);
  }

  @Post()
  @ApiResponse('Brand Created')
  @ApiFile({ name: 'icon' })
  async create(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() icon: IFile
  ): Promise<Brand> {
    return this.brandService.create(createBrandDto, icon);
  }

  @Put(':id')
  @ApiResponse('Brand Updated')
  @ApiFile({ name: 'icon' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile() icon: IFile
  ): Promise<Brand> {
    return this.brandService.update(id, updateBrandDto, icon);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.brandService.remove(id);
  }
}
