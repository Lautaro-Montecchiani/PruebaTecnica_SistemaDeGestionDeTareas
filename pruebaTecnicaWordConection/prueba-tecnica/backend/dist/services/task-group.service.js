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
exports.TaskGroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_group_entity_1 = require("../entities/task-group.entity");
const user_entity_1 = require("../entities/user.entity");
let TaskGroupService = class TaskGroupService {
    constructor(groupRepo, userRepo) {
        this.groupRepo = groupRepo;
        this.userRepo = userRepo;
    }
    async create(name, ownerId) {
        const owner = await this.userRepo.findOne({ where: { id: ownerId } });
        if (!owner)
            throw new common_1.ForbiddenException('Usuario no encontrado');
        const group = this.groupRepo.create({ name, owner });
        return this.groupRepo.save(group);
    }
    async findAllByOwner(ownerId) {
        return this.groupRepo.find({ where: { owner: { id: ownerId } }, relations: ['owner', 'tasks'] });
    }
    async remove(id, ownerId) {
        const group = await this.groupRepo.findOne({ where: { id }, relations: ['owner'] });
        if (!group)
            throw new common_1.NotFoundException('Grupo no encontrado');
        if (group.owner.id !== ownerId)
            throw new common_1.ForbiddenException('No tienes permiso');
        await this.groupRepo.delete(id);
    }
};
exports.TaskGroupService = TaskGroupService;
exports.TaskGroupService = TaskGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_group_entity_1.TaskGroup)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TaskGroupService);
//# sourceMappingURL=task-group.service.js.map