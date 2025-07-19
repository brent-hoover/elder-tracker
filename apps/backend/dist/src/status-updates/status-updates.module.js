"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusUpdatesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const status_updates_controller_1 = require("./status-updates.controller");
const status_updates_service_1 = require("./status-updates.service");
const status_update_entity_1 = require("./status-update.entity");
const users_module_1 = require("../users/users.module");
const elders_module_1 = require("../elders/elders.module");
let StatusUpdatesModule = class StatusUpdatesModule {
};
exports.StatusUpdatesModule = StatusUpdatesModule;
exports.StatusUpdatesModule = StatusUpdatesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([status_update_entity_1.StatusUpdate]),
            users_module_1.UsersModule,
            elders_module_1.EldersModule,
        ],
        controllers: [status_updates_controller_1.StatusUpdatesController],
        providers: [status_updates_service_1.StatusUpdatesService],
        exports: [status_updates_service_1.StatusUpdatesService],
    })
], StatusUpdatesModule);
//# sourceMappingURL=status-updates.module.js.map