// specification.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specification } from '../entities/specification.entity';

@Injectable()
export class SpecificationService {
  constructor(
    @InjectRepository(Specification)
    private specificationRepository: Repository<Specification>
  ) {}

  async findAll(): Promise<Specification[]> {
    return this.specificationRepository.find();
  }

  async findOne(id: number): Promise<Specification> {
    return this.specificationRepository.findOneBy({ id });
  }

  async create(
    specificationData: Partial<Specification>
  ): Promise<Specification> {
    const specification =
      this.specificationRepository.create(specificationData);
    return this.specificationRepository.save(specification);
  }

  async update(
    id: number,
    specificationData: Partial<Specification>
  ): Promise<Specification> {
    await this.specificationRepository.update(id, specificationData);
    return this.specificationRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.specificationRepository.delete(id);
  }
}
