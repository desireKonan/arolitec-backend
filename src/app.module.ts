import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModule } from './config/module.config';
import { ProfitService } from './analytics/profit.service';
import { ProfitController } from './analytics/profit.controller';
import { PrismaService } from './service/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [configModule(), MulterModule.register({
    dest: './uploads'
  })],
  controllers: [AppController, ProfitController],
  providers: [AppService, ProfitService, PrismaService],
})
export class AppModule {}
