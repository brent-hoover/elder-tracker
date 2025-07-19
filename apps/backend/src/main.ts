import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

// Debug environment variables at startup
console.log('=== Application Startup ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('PORT:', process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Elder Tracker API')
    .setDescription(
      'API for managing elderly care with caregiver collaboration',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Serve static frontend files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, 'frontend')));
    app.use('*', (req, res) => {
      res.sendFile(join(__dirname, 'frontend', 'index.html'));
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
