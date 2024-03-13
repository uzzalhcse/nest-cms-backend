import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specification } from './entities/specification.entity';

@Injectable()
export class SpecificationService {
  constructor(
    @InjectRepository(Specification)
    private readonly specificationRepository: Repository<Specification>
  ) {}

  async create(specification: Specification): Promise<Specification> {
    return this.specificationRepository.save(specification);
  }

  async findAll(): Promise<Specification[]> {
    return this.specificationRepository.find();
  }

  async findOne(id: number): Promise<Specification> {
    return this.specificationRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateSpecification: Partial<Specification>
  ): Promise<Specification> {
    await this.specificationRepository.update(id, updateSpecification);
    return this.specificationRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.specificationRepository.delete(id);
  }
}
