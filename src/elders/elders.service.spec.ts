import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { EldersService } from './elders.service';
import { Elder } from './elder.entity';
import { User } from '../users/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('EldersService', () => {
  let service: EldersService;

  const mockElder = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: new Date('1945-01-01'),
    address: '123 Main St',
    phoneNumber: '+1234567890',
    emergencyContact: 'Jane Doe',
    emergencyContactPhone: '+0987654321',
    medicalNotes: 'Diabetes',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    caregivers: [],
  };

  const mockUser = {
    id: '456e4567-e89b-12d3-a456-426614174000',
    email: 'caregiver@example.com',
    firstName: 'Care',
    lastName: 'Giver',
  };

  const mockEldersRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    delete: vi.fn(),
    createQueryBuilder: vi.fn(),
  };

  const mockUsersRepository = {
    find: vi.fn(),
    findOne: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EldersService,
        {
          provide: getRepositoryToken(Elder),
          useValue: mockEldersRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<EldersService>(EldersService);

    // Reset all mocks
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of elders', async () => {
      mockEldersRepository.find.mockResolvedValue([mockElder]);
      const result = await service.findAll();
      expect(result).toEqual([mockElder]);
      expect(mockEldersRepository.find).toHaveBeenCalledWith({
        relations: ['caregivers'],
        select: {
          caregivers: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return an elder if found', async () => {
      mockEldersRepository.findOne.mockResolvedValue(mockElder);
      const result = await service.findOne(mockElder.id);
      expect(result).toEqual(mockElder);
    });

    it('should throw NotFoundException if elder not found', async () => {
      mockEldersRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new elder', async () => {
      const createElderDto = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1945-01-01',
      };

      mockEldersRepository.create.mockReturnValue(mockElder);
      mockEldersRepository.save.mockResolvedValue(mockElder);

      const result = await service.create(createElderDto);
      expect(result).toEqual(mockElder);
      expect(mockEldersRepository.create).toHaveBeenCalledWith(createElderDto);
      expect(mockEldersRepository.save).toHaveBeenCalledWith(mockElder);
    });
  });

  describe('assignCaregivers', () => {
    it('should assign caregivers to an elder', async () => {
      const assignCaregiversDto = { userIds: [mockUser.id] };
      const elderWithCaregivers = { ...mockElder, caregivers: [] };

      mockEldersRepository.findOne.mockResolvedValue(elderWithCaregivers);
      mockUsersRepository.find.mockResolvedValue([mockUser]);
      mockEldersRepository.save.mockResolvedValue({
        ...elderWithCaregivers,
        caregivers: [mockUser],
      });

      const result = await service.assignCaregivers(
        mockElder.id,
        assignCaregiversDto,
      );
      expect(result.caregivers).toContain(mockUser);
      expect(mockUsersRepository.find).toHaveBeenCalledWith({
        where: { id: In([mockUser.id]) },
      });
    });

    it('should throw NotFoundException if elder not found', async () => {
      mockEldersRepository.findOne.mockResolvedValue(null);
      await expect(
        service.assignCaregivers('invalid-id', { userIds: [] }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockEldersRepository.findOne.mockResolvedValue(mockElder);
      mockUsersRepository.find.mockResolvedValue([]);
      await expect(
        service.assignCaregivers(mockElder.id, { userIds: ['invalid-user'] }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
