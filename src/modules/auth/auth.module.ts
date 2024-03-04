import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret, // TODO: load jwt secret from .env
      signOptions: { expiresIn: '1w' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService
    // { // Todo: uncomment this to enable global guard again
    //   provide: APP_GUARD,
    //   useClass: AuthGuard
    // }
  ]
})
export class AuthModule {}
