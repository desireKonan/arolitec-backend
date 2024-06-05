import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModule } from './config/module.config';
import { ProfitService } from './analytics/profit.service';
import { ProfitController } from './analytics/profit.controller';
import { PrismaService } from './service/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthService } from './authentication/auth.service';
import { AuthController } from './authentication/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './authentication/auth.constant';
import { AuthGuard } from './authentication/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    configModule(), 
    MulterModule.register({
      dest: './uploads'
    }), 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [
    AppController, 
    ProfitController, 
    UserController, 
    AuthController
  ],
  providers: [
    AppService, 
    ProfitService, 
    UserService, 
    PrismaService, 
    AuthService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
