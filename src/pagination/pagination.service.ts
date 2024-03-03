// pagination.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  paginate(
    data: any[],
    page: number,
    limit: number
  ): { data: any[]; meta: PaginationMeta } {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedData = data.slice(startIndex, endIndex);

    const paginationMeta: PaginationMeta = {
      totalItems: data.length,
      itemsPerPage: limit,
      currentPage: page,
      totalPages: Math.ceil(data.length / limit)
    };

    return { data: paginatedData, meta: paginationMeta };
  }
}

export interface PaginationMeta {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}
