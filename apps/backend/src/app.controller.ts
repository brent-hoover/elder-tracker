import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string; env: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || 'unknown',
    };
  }
}
