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

  // Set global prefix for API routes
  app.setGlobalPrefix('api');

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
  SwaggerModule.setup('api/docs', app, document);

  // Serve static frontend files in production
  if (process.env.NODE_ENV === 'production') {
    const expressApp = app.getHttpAdapter().getInstance();
    
    // Serve static files from the frontend build
    expressApp.use(express.static(join(__dirname, 'frontend')));
    
    // Handle all non-API routes by serving the frontend
    expressApp.get('*', (req, res) => {
      // Don't serve index.html for API routes
      if (!req.path.startsWith('/api')) {
        res.sendFile(join(__dirname, 'frontend', 'index.html'));
      }
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
