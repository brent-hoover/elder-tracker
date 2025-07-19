import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { StatusUpdate } from './status-update.entity';
import { CreateStatusUpdateDto } from './dto/create-status-update.dto';
import { UpdateStatusUpdateDto } from './dto/update-status-update.dto';
import { FilterStatusUpdateDto } from './dto/filter-status-update.dto';
import { UsersService } from '../users/users.service';
import { EldersService } from '../elders/elders.service';

@Injectable()
export class StatusUpdatesService {
  constructor(
    @InjectRepository(StatusUpdate)
    private statusUpdatesRepository: Repository<StatusUpdate>,
    private usersService: UsersService,
    private eldersService: EldersService,
  ) {}

  async create(
    createStatusUpdateDto: CreateStatusUpdateDto,
    userId: string,
  ): Promise<StatusUpdate> {
    const user = await this.usersService.findOne(userId);
    const elder = await this.eldersService.findOne(
      createStatusUpdateDto.elderId,
    );

    // Check if user is a caregiver for this elder
    const isCaregiver = elder.caregivers.some(
      (caregiver) => caregiver.id === userId,
    );
    if (!isCaregiver) {
      throw new ForbiddenException('You are not a caregiver for this elder');
    }

    const statusUpdate = this.statusUpdatesRepository.create({
      ...createStatusUpdateDto,
      createdBy: user,
      elder: elder,
      eventDate: createStatusUpdateDto.eventDate
        ? new Date(createStatusUpdateDto.eventDate)
        : new Date(),
    });

    return this.statusUpdatesRepository.save(statusUpdate);
  }

  async findAll(filters?: FilterStatusUpdateDto): Promise<StatusUpdate[]> {
    const where: FindOptionsWhere<StatusUpdate> = {};

    if (filters?.elderId) {
      where.elder = { id: filters.elderId };
    }

    if (filters?.userId) {
      where.createdBy = { id: filters.userId };
    }

    if (filters?.type) {
      where.type = filters.type;
    }

    if (filters?.startDate && filters?.endDate) {
      where.eventDate = Between(
        new Date(filters.startDate),
        new Date(filters.endDate),
      );
    }

    return this.statusUpdatesRepository.find({
      where,
      relations: ['createdBy', 'elder'],
      order: { eventDate: 'DESC' },
    });
  }

  async findByElder(elderId: string, userId: string): Promise<StatusUpdate[]> {
    // Verify user is a caregiver for this elder
    const elder = await this.eldersService.findOne(elderId);
    const isCaregiver = elder.caregivers.some(
      (caregiver) => caregiver.id === userId,
    );
    if (!isCaregiver) {
      throw new ForbiddenException('You are not a caregiver for this elder');
    }

    return this.statusUpdatesRepository.find({
      where: { elder: { id: elderId } },
      relations: ['createdBy', 'elder'],
      order: { eventDate: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<StatusUpdate> {
    const statusUpdate = await this.statusUpdatesRepository.findOne({
      where: { id },
      relations: ['createdBy', 'elder', 'elder.caregivers'],
    });

    if (!statusUpdate) {
      throw new NotFoundException(`Status update with ID ${id} not found`);
    }

    // Verify user is a caregiver for this elder
    const isCaregiver = statusUpdate.elder.caregivers.some(
      (caregiver) => caregiver.id === userId,
    );
    if (!isCaregiver) {
      throw new ForbiddenException('You are not a caregiver for this elder');
    }

    return statusUpdate;
  }

  async update(
    id: string,
    updateStatusUpdateDto: UpdateStatusUpdateDto,
    userId: string,
  ): Promise<StatusUpdate> {
    const statusUpdate = await this.findOne(id, userId);

    // Only the creator can update their status update
    if (statusUpdate.createdBy.id !== userId) {
      throw new ForbiddenException(
        'You can only update your own status updates',
      );
    }

    Object.assign(statusUpdate, updateStatusUpdateDto);
    if (updateStatusUpdateDto.eventDate) {
      statusUpdate.eventDate = new Date(updateStatusUpdateDto.eventDate);
    }

    return this.statusUpdatesRepository.save(statusUpdate);
  }

  async remove(id: string, userId: string): Promise<void> {
    const statusUpdate = await this.findOne(id, userId);

    // Only the creator can delete their status update
    if (statusUpdate.createdBy.id !== userId) {
      throw new ForbiddenException(
        'You can only delete your own status updates',
      );
    }

    await this.statusUpdatesRepository.delete(id);
  }
}
