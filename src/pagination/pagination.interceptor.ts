// pagination.interceptor.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationMeta, PaginationService } from './pagination.service';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  constructor(private readonly paginationService: PaginationService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        if (request.query.page && Array.isArray(data)) {
          const page = parseInt(request.query.page, 10) || 1;
          const itemsPerPage = parseInt(request.query.limit, 10) || 10;

          const paginatedData = this.paginationService.paginate(
            data,
            page,
            itemsPerPage
          );
          const paginationMeta: PaginationMeta = {
            totalItems: data.length,
            itemsPerPage,
            currentPage: page,
            totalPages: Math.ceil(data.length / itemsPerPage)
          };

          return paginatedData;
          // return { data: paginatedData, meta: paginationMeta };
        }

        return data;
      })
    );
  }
}
