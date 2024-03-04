import { Global, Module, type Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';
import { PaginationService } from './services/pagination.service';

const providers: Provider[] = [
  ValidatorService,
  GeneratorService,
  PaginationService
];

@Global()
@Module({
  providers,
  imports: [CqrsModule],
  exports: [...providers, CqrsModule]
})
export class SharedModule {}
