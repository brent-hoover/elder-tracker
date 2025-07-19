import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusUpdatesController } from './status-updates.controller';
import { StatusUpdatesService } from './status-updates.service';
import { StatusUpdate } from './status-update.entity';
import { UsersModule } from '../users/users.module';
import { EldersModule } from '../elders/elders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StatusUpdate]),
    UsersModule,
    EldersModule,
  ],
  controllers: [StatusUpdatesController],
  providers: [StatusUpdatesService],
  exports: [StatusUpdatesService],
})
export class StatusUpdatesModule {}
