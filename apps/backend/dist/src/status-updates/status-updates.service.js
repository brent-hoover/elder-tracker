"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusUpdatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const status_update_entity_1 = require("./status-update.entity");
const users_service_1 = require("../users/users.service");
const elders_service_1 = require("../elders/elders.service");
let StatusUpdatesService = class StatusUpdatesService {
    statusUpdatesRepository;
    usersService;
    eldersService;
    constructor(statusUpdatesRepository, usersService, eldersService) {
        this.statusUpdatesRepository = statusUpdatesRepository;
        this.usersService = usersService;
        this.eldersService = eldersService;
    }
    async create(createStatusUpdateDto, userId) {
        const user = await this.usersService.findOne(userId);
        const elder = await this.eldersService.findOne(createStatusUpdateDto.elderId);
        const isCaregiver = elder.caregivers.some((caregiver) => caregiver.id === userId);
        if (!isCaregiver) {
            throw new common_1.ForbiddenException('You are not a caregiver for this elder');
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
    async findAll(filters) {
        const where = {};
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
            where.eventDate = (0, typeorm_2.Between)(new Date(filters.startDate), new Date(filters.endDate));
        }
        return this.statusUpdatesRepository.find({
            where,
            relations: ['createdBy', 'elder'],
            order: { eventDate: 'DESC' },
        });
    }
    async findByElder(elderId, userId) {
        const elder = await this.eldersService.findOne(elderId);
        const isCaregiver = elder.caregivers.some((caregiver) => caregiver.id === userId);
        if (!isCaregiver) {
            throw new common_1.ForbiddenException('You are not a caregiver for this elder');
        }
        return this.statusUpdatesRepository.find({
            where: { elder: { id: elderId } },
            relations: ['createdBy', 'elder'],
            order: { eventDate: 'DESC' },
        });
    }
    async findOne(id, userId) {
        const statusUpdate = await this.statusUpdatesRepository.findOne({
            where: { id },
            relations: ['createdBy', 'elder', 'elder.caregivers'],
        });
        if (!statusUpdate) {
            throw new common_1.NotFoundException(`Status update with ID ${id} not found`);
        }
        const isCaregiver = statusUpdate.elder.caregivers.some((caregiver) => caregiver.id === userId);
        if (!isCaregiver) {
            throw new common_1.ForbiddenException('You are not a caregiver for this elder');
        }
        return statusUpdate;
    }
    async update(id, updateStatusUpdateDto, userId) {
        const statusUpdate = await this.findOne(id, userId);
        if (statusUpdate.createdBy.id !== userId) {
            throw new common_1.ForbiddenException('You can only update your own status updates');
        }
        Object.assign(statusUpdate, updateStatusUpdateDto);
        if (updateStatusUpdateDto.eventDate) {
            statusUpdate.eventDate = new Date(updateStatusUpdateDto.eventDate);
        }
        return this.statusUpdatesRepository.save(statusUpdate);
    }
    async remove(id, userId) {
        const statusUpdate = await this.findOne(id, userId);
        if (statusUpdate.createdBy.id !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own status updates');
        }
        await this.statusUpdatesRepository.delete(id);
    }
};
exports.StatusUpdatesService = StatusUpdatesService;
exports.StatusUpdatesService = StatusUpdatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(status_update_entity_1.StatusUpdate)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        elders_service_1.EldersService])
], StatusUpdatesService);
//# sourceMappingURL=status-updates.service.js.map