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
exports.EldersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const elder_entity_1 = require("./elder.entity");
const user_entity_1 = require("../users/user.entity");
let EldersService = class EldersService {
    eldersRepository;
    usersRepository;
    constructor(eldersRepository, usersRepository) {
        this.eldersRepository = eldersRepository;
        this.usersRepository = usersRepository;
    }
    async create(createElderDto) {
        const elder = this.eldersRepository.create(createElderDto);
        return this.eldersRepository.save(elder);
    }
    async findAll() {
        return this.eldersRepository.find({
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
    }
    async findOne(id) {
        const elder = await this.eldersRepository.findOne({
            where: { id },
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
        if (!elder) {
            throw new common_1.NotFoundException(`Elder with ID ${id} not found`);
        }
        return elder;
    }
    async findByCaregiver(userId) {
        return this.eldersRepository
            .createQueryBuilder('elder')
            .leftJoin('elder.caregivers', 'caregiver')
            .where('caregiver.id = :userId', { userId })
            .andWhere('elder.isActive = :isActive', { isActive: true })
            .leftJoinAndSelect('elder.caregivers', 'allCaregivers')
            .getMany();
    }
    async update(id, updateElderDto) {
        const elder = await this.eldersRepository.findOne({ where: { id } });
        if (!elder) {
            throw new common_1.NotFoundException(`Elder with ID ${id} not found`);
        }
        Object.assign(elder, updateElderDto);
        return this.eldersRepository.save(elder);
    }
    async remove(id) {
        const result = await this.eldersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Elder with ID ${id} not found`);
        }
    }
    async assignCaregivers(id, assignCaregiversDto) {
        const elder = await this.eldersRepository.findOne({
            where: { id },
            relations: ['caregivers'],
        });
        if (!elder) {
            throw new common_1.NotFoundException(`Elder with ID ${id} not found`);
        }
        const users = await this.usersRepository.find({
            where: { id: (0, typeorm_2.In)(assignCaregiversDto.userIds) },
        });
        if (users.length !== assignCaregiversDto.userIds.length) {
            throw new common_1.NotFoundException('One or more users not found');
        }
        elder.caregivers = users;
        return this.eldersRepository.save(elder);
    }
    async addCaregiver(elderId, userId) {
        const elder = await this.eldersRepository.findOne({
            where: { id: elderId },
            relations: ['caregivers'],
        });
        if (!elder) {
            throw new common_1.NotFoundException(`Elder with ID ${elderId} not found`);
        }
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const existingCaregiver = elder.caregivers.find((c) => c.id === userId);
        if (!existingCaregiver) {
            elder.caregivers.push(user);
            await this.eldersRepository.save(elder);
        }
        return this.findOne(elderId);
    }
    async removeCaregiver(elderId, userId) {
        const elder = await this.eldersRepository.findOne({
            where: { id: elderId },
            relations: ['caregivers'],
        });
        if (!elder) {
            throw new common_1.NotFoundException(`Elder with ID ${elderId} not found`);
        }
        elder.caregivers = elder.caregivers.filter((c) => c.id !== userId);
        await this.eldersRepository.save(elder);
        return this.findOne(elderId);
    }
};
exports.EldersService = EldersService;
exports.EldersService = EldersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(elder_entity_1.Elder)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EldersService);
//# sourceMappingURL=elders.service.js.map