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
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

// Ensure required environment variables
if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
  console.error('ERROR: DATABASE_URL is required in production');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET not set, using default (INSECURE FOR PRODUCTION)');
  process.env.JWT_SECRET = 'default-jwt-secret-change-in-production';
}

async function bootstrap() {
  console.log('=== Starting NestJS Application ===');
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
    console.log('=== Setting up production static file serving ===');
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

  const port = process.env.PORT ?? 3000;
  
  // Add a simple health check endpoint before app starts
  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance();
  instance.get('/api/health-check', (req, res) => {
    res.json({ status: 'starting', port, timestamp: new Date().toISOString() });
  });
  
  await app.listen(port, '0.0.0.0');
  console.log(`=== Application is running on port ${port} ===`);
}
bootstrap().catch((error) => {
  console.error('=== Failed to start application ===');
  console.error(error);
  process.exit(1);
});
