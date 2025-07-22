import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as promBundle from 'express-prom-bundle';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.enableCors({ origin: [/localhost/, /mechama/], credentials: true });
  app.use(rateLimit.default({ windowMs: 60 * 1000, max: 100 }));
  app.use('/metrics', promBundle({ includeMethod: true, includePath: true }));

  const config = new DocumentBuilder()
    .setTitle('MeChama API')
    .setDescription('API RESTful MeChama')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
