import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseInterceptor } from './utils/api-response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Category } from './modules/product/entities/category.entity';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BlogModule } from './modules/blog/blog.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { Blog } from './modules/blog/entities/blog.entity';
import { ProductModule } from './modules/product/product.module';
import { Product } from './modules/product/entities/product.entity';
import { Brand } from './modules/product/entities/brand.entity';
import { Specification } from './modules/product/entities/specification.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestify-cms',
      entities: [User, Category, Brand, Product, Specification, Blog],
      synchronize: true
    }),
    AuthModule,
    SharedModule,
    BlogModule,
    UserModule,
    ProductModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor
    }
  ]
})
export class AppModule {}
