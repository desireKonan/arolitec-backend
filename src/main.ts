import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('ETL App')
    .setDescription('The ETL Sms Analysis Plateform description')
    .setVersion('1.0')
    .addTag('SMS Analysis plateform')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentations', app, document);



  await app.listen(3000);
}
bootstrap();
