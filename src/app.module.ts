import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from './pagination/pagination.module';
import { ApiResponseInterceptor } from './utils/api-response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { User } from './modules/users/entities/user.entity';
import { Category } from './modules/common/entities/category.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestify-cms',
      entities: [User, Category],
      synchronize: true
    }),
    UsersModule,
    AuthModule,
    CommonModule,
    PaginationModule
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
