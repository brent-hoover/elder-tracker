import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => {
    // Log all env vars starting with 'DATABASE' or 'RAILWAY' for debugging
    console.log('=== Database Configuration Debug ===');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('DATABASE_URL length:', process.env.DATABASE_URL?.length || 0);
    console.log('RAILWAY env vars:', Object.keys(process.env).filter(key => key.includes('RAILWAY')));
    console.log('Database-related env vars:', Object.keys(process.env).filter(key => 
      key.includes('DATABASE') || key.includes('POSTGRES') || key.includes('DB')
    ));
    
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
          ssl: { rejectUnauthorized: false }
        }
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
