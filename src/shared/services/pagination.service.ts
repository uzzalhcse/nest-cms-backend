// pagination.service.ts

import { Injectable } from '@nestjs/common';
import { PageMeta } from '../../common/dto/page-meta.dto';

@Injectable()
export class PaginationService {
  paginate(
    data: any[],
    page: number,
    limit: number
  ): { data: any[]; meta: PageMeta } {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedData = data.slice(startIndex, endIndex);

    const paginationMeta: PageMeta = {
      totalItems: data.length,
      itemsPerPage: limit,
      currentPage: page,
      totalPages: Math.ceil(data.length / limit)
    };

    return { data: paginatedData, meta: paginationMeta };
  }
}
