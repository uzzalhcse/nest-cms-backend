// api-response.interceptor.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        const apiResponseMetadata = Reflect.getMetadata(
          'apiResponse',
          context.getHandler()
        );

        return {
          statusCode: apiResponseMetadata?.statusCode || 200,
          message: apiResponseMetadata?.message || 'Success',
          data
        };
      })
    );
  }
}
