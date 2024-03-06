import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseInterceptor } from './utils/api-response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Category } from './modules/common/entities/category.entity';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { SharedModule } from './shared/shared.module';
import { BlogModule } from './modules/blog/blog.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { Blog } from './modules/blog/entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestify-cms',
      entities: [User, Category, Blog],
      synchronize: true
    }),
    AuthModule,
    CommonModule,
    SharedModule,
    BlogModule,
    UserModule
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
