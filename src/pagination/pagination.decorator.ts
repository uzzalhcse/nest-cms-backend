// pagination.decorator.ts

import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { PaginationInterceptor } from './pagination.interceptor';

export function Paginable() {
  return applyDecorators(UseInterceptors(PaginationInterceptor));
}
