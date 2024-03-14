// seeder.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeederService {
  constructor() {} // private readonly specificationService: SpecificationService // private readonly productService: ProductService, // private readonly categoryService: CategoryService, // private readonly brandService: BrandService, // private readonly userService: UserService

  async seedAll() {
    // await this.userService.seed();
    // await this.brandService.seed();
    // await this.categoryService.seed();
    // await this.productService.seed();
    // await this.specificationService.seed();
    // Seed other entities as needed
  }
}
