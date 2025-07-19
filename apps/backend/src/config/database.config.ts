import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => {
    // Log database configuration for debugging
    console.log('=== Database Configuration ===');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    
    // Railway provides DATABASE_URL
    if (process.env.DATABASE_URL || process.env.RAILWAY_DATABASE_URL) {
      const dbUrl = process.env.DATABASE_URL || process.env.RAILWAY_DATABASE_URL;
      console.log('Using DATABASE_URL for connection');
      console.log('Connection URL length:', dbUrl?.length || 0);
      
      return {
        type: 'postgres',
        url: dbUrl,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // Allow sync in production for initial setup
        logging: true, // Enable logging to see connection attempts
        ssl: { rejectUnauthorized: false },
        extra: {
          // Additional connection options for Railway
          ssl: { rejectUnauthorized: false },
          // Connection pool settings
          max: 5,
          connectionTimeoutMillis: 60000, // 60 seconds
        },
        retryAttempts: 5,
        retryDelay: 5000, // 5 seconds between retries
      };
    }

    // Local development configuration
    console.log('Using local development configuration');
    return {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'elder_tracker',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
    };
  },
);
