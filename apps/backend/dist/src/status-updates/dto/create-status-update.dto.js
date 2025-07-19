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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStatusUpdateDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const update_type_enum_1 = require("../enums/update-type.enum");
class CreateStatusUpdateDto {
    type;
    description;
    eventDate;
    elderId;
}
exports.CreateStatusUpdateDto = CreateStatusUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: update_type_enum_1.UpdateType,
        example: update_type_enum_1.UpdateType.GENERAL_OBSERVATION,
        description: 'Type of status update',
    }),
    (0, class_validator_1.IsEnum)(update_type_enum_1.UpdateType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStatusUpdateDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Elder seemed in good spirits today and ate all meals',
        description: 'Detailed description of the observation or event',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStatusUpdateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2024-01-15T10:30:00Z',
        description: 'When the event occurred (defaults to current time)',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStatusUpdateDto.prototype, "eventDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID of the elder this update is for',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStatusUpdateDto.prototype, "elderId", void 0);
//# sourceMappingURL=create-status-update.dto.js.map