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
exports.StatusUpdatesController = void 0;
const common_1 = require("@nestjs/common");
const status_updates_service_1 = require("./status-updates.service");
const create_status_update_dto_1 = require("./dto/create-status-update.dto");
const update_status_update_dto_1 = require("./dto/update-status-update.dto");
const filter_status_update_dto_1 = require("./dto/filter-status-update.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let StatusUpdatesController = class StatusUpdatesController {
    statusUpdatesService;
    constructor(statusUpdatesService) {
        this.statusUpdatesService = statusUpdatesService;
    }
    create(createStatusUpdateDto, req) {
        return this.statusUpdatesService.create(createStatusUpdateDto, req.user.userId);
    }
    findAll(filters) {
        return this.statusUpdatesService.findAll(filters);
    }
    findByElder(elderId, req) {
        return this.statusUpdatesService.findByElder(elderId, req.user.userId);
    }
    findOne(id, req) {
        return this.statusUpdatesService.findOne(id, req.user.userId);
    }
    update(id, updateStatusUpdateDto, req) {
        return this.statusUpdatesService.update(id, updateStatusUpdateDto, req.user.userId);
    }
    remove(id, req) {
        return this.statusUpdatesService.remove(id, req.user.userId);
    }
};
exports.StatusUpdatesController = StatusUpdatesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new status update' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Status update created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_status_update_dto_1.CreateStatusUpdateDto, Object]),
    __metadata("design:returntype", Promise)
], StatusUpdatesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all status updates with optional filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of status updates retrieved' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_status_update_dto_1.FilterStatusUpdateDto]),
    __metadata("design:returntype", Promise)
], StatusUpdatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('elder/:elderId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get status updates for a specific elder' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of status updates retrieved' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - Not a caregiver for this elder',
    }),
    __param(0, (0, common_1.Param)('elderId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StatusUpdatesController.prototype, "findByElder", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get status update by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status update retrieved' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - Not a caregiver for this elder',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Status update not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StatusUpdatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_update_dto_1.UpdateStatusUpdateDto, Object]),
    __metadata("design:returntype", Promise)
], StatusUpdatesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StatusUpdatesController.prototype, "remove", null);
exports.StatusUpdatesController = StatusUpdatesController = __decorate([
    (0, swagger_1.ApiTags)('status-updates'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('status-updates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [status_updates_service_1.StatusUpdatesService])
], StatusUpdatesController);
//# sourceMappingURL=status-updates.controller.js.map