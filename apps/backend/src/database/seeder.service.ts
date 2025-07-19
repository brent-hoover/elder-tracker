import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    // Wait for database connection and tables to be ready
    await this.waitForDatabase();
    
    try {
      await this.seedAdminUser();
    } catch (error) {
      console.error('Error seeding admin user:', error);
    }
  }

  private async waitForDatabase(maxRetries = 10, delay = 1000): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        // Check if the users table exists
        const result = await this.dataSource.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'users'
          );
        `);
        
        if (result[0]?.exists) {
          console.log('✅ Database tables are ready');
          return;
        }
      } catch (error) {
        console.log(`⏳ Waiting for database tables to be created... (attempt ${i + 1}/${maxRetries})`);
      }
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw new Error('Database tables were not created in time');
  }

  private async seedAdminUser() {
    const adminEmail = 'admin@eldertracker.com';
    
    // Check if admin user already exists
    const existingAdmin = await this.userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const adminUser = this.userRepository.create({
        email: adminEmail,
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        isAdmin: true,
      });

      await this.userRepository.save(adminUser);
      
      console.log('✅ Admin user created successfully');
      console.log('📧 Email: admin@eldertracker.com');
      console.log('🔑 Password: admin123');
      console.log('⚠️  Please change the password after first login!');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  }
}