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
exports.EldersController = void 0;
const common_1 = require("@nestjs/common");
const elders_service_1 = require("./elders.service");
const create_elder_dto_1 = require("./dto/create-elder.dto");
const update_elder_dto_1 = require("./dto/update-elder.dto");
const assign_caregivers_dto_1 = require("./dto/assign-caregivers.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
const swagger_1 = require("@nestjs/swagger");
let EldersController = class EldersController {
    eldersService;
    constructor(eldersService) {
        this.eldersService = eldersService;
    }
    create(createElderDto) {
        return this.eldersService.create(createElderDto);
    }
    findAll() {
        return this.eldersService.findAll();
    }
    findOne(id) {
        return this.eldersService.findOne(id);
    }
    findByCaregiver(userId) {
        return this.eldersService.findByCaregiver(userId);
    }
    update(id, updateElderDto) {
        return this.eldersService.update(id, updateElderDto);
    }
    remove(id) {
        return this.eldersService.remove(id);
    }
    assignCaregivers(id, assignCaregiversDto) {
        return this.eldersService.assignCaregivers(id, assignCaregiversDto);
    }
    addCaregiver(elderId, userId) {
        return this.eldersService.addCaregiver(elderId, userId);
    }
    removeCaregiver(elderId, userId) {
        return this.eldersService.removeCaregiver(elderId, userId);
    }
};
exports.EldersController = EldersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new elder (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Elder created successfully' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - Admin access required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_elder_dto_1.CreateElderDto]),
    __metadata("design:returntype", Promise)
], EldersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all elders' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of elders retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EldersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get elder by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Elder retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Elder not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EldersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('caregiver/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get elders assigned to a specific caregiver' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of elders retrieved' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EldersController.prototype, "findByCaregiver", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_elder_dto_1.UpdateElderDto]),
    __metadata("design:returntype", Promise)
], EldersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EldersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/caregivers'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_caregivers_dto_1.AssignCaregiversDto]),
    __metadata("design:returntype", Promise)
], EldersController.prototype, "assignCaregivers", null);
__decorate([
    (0, common_1.Post)(':elderId/caregivers/:userId'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('elderId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EldersController.prototype, "addCaregiver", null);
__decorate([
    (0, common_1.Delete)(':elderId/caregivers/:userId'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('elderId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EldersController.prototype, "removeCaregiver", null);
exports.EldersController = EldersController = __decorate([
    (0, swagger_1.ApiTags)('elders'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('elders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [elders_service_1.EldersService])
], EldersController);
//# sourceMappingURL=elders.controller.js.map