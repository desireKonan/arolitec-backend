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

@Module({
  imports: [configModule(), MulterModule.register({
    dest: './uploads'
  })],
  controllers: [AppController, ProfitController, UserController],
  providers: [AppService, ProfitService, UserService, PrismaService],
})
export class AppModule {}
