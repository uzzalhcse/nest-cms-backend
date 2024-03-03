// api-response.decorator.ts

import { SetMetadata, UseInterceptors } from '@nestjs/common';
import { ApiResponseInterceptor } from './api-response.interceptor';

export const ApiResponse = (message = 'Success', statusCode = 200) => {
  return SetMetadata('apiResponse', { message, statusCode });
};

export const UseApiResponse = () => {
  return function (
    target: Object,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<unknown>
  ) {
    UseInterceptors(ApiResponseInterceptor)(target, key, descriptor);
  };
};
