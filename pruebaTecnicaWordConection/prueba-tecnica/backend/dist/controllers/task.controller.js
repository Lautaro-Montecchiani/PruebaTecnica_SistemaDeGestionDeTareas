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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const task_dto_1 = require("../dto/task.dto");
const common_3 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const task_service_1 = require("../services/task.service");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async findAll(page, limit, status, categoryId) {
        return this.taskService.findAll({ page, limit, status, categoryId });
    }
    async findOne(id) {
        return this.taskService.findOne(id);
    }
    async create(task) {
        return this.taskService.create(task);
    }
    async update(id, task, req) {
        const user = req.user;
        return this.taskService.update(id, task, user);
    }
    async remove(id, req) {
        const user = req.user;
        return this.taskService.remove(id, user);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_3.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_3.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))),
    __param(2, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, task_dto_1.UpdateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "remove", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('tasks'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map