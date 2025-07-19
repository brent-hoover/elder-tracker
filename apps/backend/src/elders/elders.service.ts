import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Elder } from './elder.entity';
import { User } from '../users/user.entity';
import { CreateElderDto } from './dto/create-elder.dto';
import { UpdateElderDto } from './dto/update-elder.dto';
import { AssignCaregiversDto } from './dto/assign-caregivers.dto';

@Injectable()
export class EldersService {
  constructor(
    @InjectRepository(Elder)
    private eldersRepository: Repository<Elder>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createElderDto: CreateElderDto): Promise<Elder> {
    const elder = this.eldersRepository.create(createElderDto);
    return this.eldersRepository.save(elder);
  }

  async findAll(): Promise<Elder[]> {
    return this.eldersRepository.find({
      relations: ['caregivers'],
    });
  }

  async findOne(id: string): Promise<Elder> {
    console.log(`=== Finding elder with ID: ${id} ===`);
    const elder = await this.eldersRepository.findOne({
      where: { id },
      relations: ['caregivers'],
    });
    console.log(`=== Elder found: ${elder ? 'YES' : 'NO'} ===`);
    if (!elder) {
      throw new NotFoundException(`Elder with ID ${id} not found`);
    }
    return elder;
  }

  async findByCaregiver(userId: string): Promise<Elder[]> {
    return this.eldersRepository
      .createQueryBuilder('elder')
      .leftJoin('elder.caregivers', 'caregiver')
      .where('caregiver.id = :userId', { userId })
      .andWhere('elder.isActive = :isActive', { isActive: true })
      .leftJoinAndSelect('elder.caregivers', 'allCaregivers')
      .getMany();
  }

  async update(id: string, updateElderDto: UpdateElderDto): Promise<Elder> {
    const elder = await this.eldersRepository.findOne({ where: { id } });
    if (!elder) {
      throw new NotFoundException(`Elder with ID ${id} not found`);
    }
    Object.assign(elder, updateElderDto);
    return this.eldersRepository.save(elder);
  }

  async remove(id: string): Promise<void> {
    const result = await this.eldersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Elder with ID ${id} not found`);
    }
  }

  async assignCaregivers(
    id: string,
    assignCaregiversDto: AssignCaregiversDto,
  ): Promise<Elder> {
    const elder = await this.eldersRepository.findOne({
      where: { id },
      relations: ['caregivers'],
    });
    if (!elder) {
      throw new NotFoundException(`Elder with ID ${id} not found`);
    }

    const users = await this.usersRepository.find({
      where: { id: In(assignCaregiversDto.userIds) },
    });

    if (users.length !== assignCaregiversDto.userIds.length) {
      throw new NotFoundException('One or more users not found');
    }

    elder.caregivers = users;
    return this.eldersRepository.save(elder);
  }

  async addCaregiver(elderId: string, userId: string): Promise<Elder> {
    const elder = await this.eldersRepository.findOne({
      where: { id: elderId },
      relations: ['caregivers'],
    });
    if (!elder) {
      throw new NotFoundException(`Elder with ID ${elderId} not found`);
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const existingCaregiver = elder.caregivers.find((c) => c.id === userId);
    if (!existingCaregiver) {
      elder.caregivers.push(user);
      await this.eldersRepository.save(elder);
    }

    return this.findOne(elderId);
  }

  async removeCaregiver(elderId: string, userId: string): Promise<Elder> {
    const elder = await this.eldersRepository.findOne({
      where: { id: elderId },
      relations: ['caregivers'],
    });
    if (!elder) {
      throw new NotFoundException(`Elder with ID ${elderId} not found`);
    }

    elder.caregivers = elder.caregivers.filter((c) => c.id !== userId);
    await this.eldersRepository.save(elder);

    return this.findOne(elderId);
  }
}
