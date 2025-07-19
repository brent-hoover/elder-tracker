import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StatusUpdatesService } from './status-updates.service';
import { StatusUpdate } from './status-update.entity';
import { UsersService } from '../users/users.service';
import { EldersService } from '../elders/elders.service';
import { UpdateType } from './enums/update-type.enum';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('StatusUpdatesService', () => {
  let service: StatusUpdatesService;

  const mockUser = {
    id: 'user-123',
    email: 'caregiver@example.com',
    firstName: 'Care',
    lastName: 'Giver',
  };

  const mockElder = {
    id: 'elder-123',
    firstName: 'John',
    lastName: 'Doe',
    caregivers: [mockUser],
  };

  const mockStatusUpdate = {
    id: 'update-123',
    type: UpdateType.DOCTOR_VISIT,
    description: 'Regular checkup',
    eventDate: new Date(),
    createdBy: mockUser,
    elder: mockElder,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockStatusUpdatesRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    delete: vi.fn(),
  };

  const mockUsersService = {
    findOne: vi.fn(),
  };

  const mockEldersService = {
    findOne: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusUpdatesService,
        {
          provide: getRepositoryToken(StatusUpdate),
          useValue: mockStatusUpdatesRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: EldersService,
          useValue: mockEldersService,
        },
      ],
    }).compile();

    service = module.get<StatusUpdatesService>(StatusUpdatesService);

    // Reset all mocks
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a status update for a caregiver', async () => {
      const createDto = {
        type: UpdateType.DOCTOR_VISIT,
        description: 'Regular checkup',
        elderId: 'elder-123',
      };

      mockUsersService.findOne.mockResolvedValue(mockUser);
      mockEldersService.findOne.mockResolvedValue(mockElder);
      mockStatusUpdatesRepository.create.mockReturnValue(mockStatusUpdate);
      mockStatusUpdatesRepository.save.mockResolvedValue(mockStatusUpdate);

      const result = await service.create(createDto, mockUser.id);
      expect(result).toEqual(mockStatusUpdate);
      expect(mockStatusUpdatesRepository.create).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if user is not a caregiver', async () => {
      const createDto = {
        type: UpdateType.DOCTOR_VISIT,
        description: 'Regular checkup',
        elderId: 'elder-123',
      };

      mockUsersService.findOne.mockResolvedValue(mockUser);
      mockEldersService.findOne.mockResolvedValue({
        ...mockElder,
        caregivers: [], // User is not a caregiver
      });

      await expect(service.create(createDto, mockUser.id)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a status update for a caregiver', async () => {
      mockStatusUpdatesRepository.findOne.mockResolvedValue({
        ...mockStatusUpdate,
        elder: { ...mockElder, caregivers: [mockUser] },
      });

      const result = await service.findOne(mockStatusUpdate.id, mockUser.id);
      expect(result).toBeDefined();
    });

    it('should throw NotFoundException if not found', async () => {
      mockStatusUpdatesRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('invalid-id', mockUser.id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if user is not a caregiver', async () => {
      mockStatusUpdatesRepository.findOne.mockResolvedValue({
        ...mockStatusUpdate,
        elder: { ...mockElder, caregivers: [] },
      });

      await expect(
        service.findOne(mockStatusUpdate.id, mockUser.id),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
