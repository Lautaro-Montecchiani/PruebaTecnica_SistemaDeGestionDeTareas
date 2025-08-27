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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../entities/task.entity");
const category_entity_1 = require("../entities/category.entity");
const user_entity_1 = require("../entities/user.entity");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async findAll(params) {
        const page = params.page && params.page > 0 ? Number(params.page) : 1;
        const limit = params.limit && params.limit > 0 ? Number(params.limit) : 10;
        const skip = (page - 1) * limit;
        const where = {};
        if (params.status && Object.values(task_entity_1.TaskStatus).includes(params.status)) {
            where.status = params.status;
        }
        if (params.categoryId) {
            where.category = { id: params.categoryId };
        }
        const [data, total] = await this.taskRepository.findAndCount({
            where,
            relations: ['user', 'category'],
            skip,
            take: limit,
            order: { id: 'DESC' },
        });
        return { data, total, page, limit };
    }
    async findOne(id) {
        return this.taskRepository.findOne({ where: { id }, relations: ['user', 'category'] });
    }
    async create(taskDto) {
        const { title, description, status, categoryId } = taskDto;
        const category = await this.taskRepository.manager.findOne(category_entity_1.Category, { where: { id: categoryId } });
        if (!category)
            throw new Error('Categoría no encontrada');
        const newTask = this.taskRepository.create({
            title,
            description,
            status,
            category,
        });
        return this.taskRepository.save(newTask);
    }
    async update(id, taskDto, user) {
        const task = await this.taskRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task)
            throw new Error('Tarea no encontrada');
        if (task.user.id !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('No tienes permisos para editar esta tarea');
        }
        const updateData = Object.assign({}, taskDto);
        if (taskDto.categoryId) {
            const category = await this.taskRepository.manager.findOne(category_entity_1.Category, { where: { id: taskDto.categoryId } });
            if (!category)
                throw new Error('Categoría no encontrada');
            updateData.category = category;
            delete updateData.categoryId;
        }
        await this.taskRepository.update(id, updateData);
        return this.findOne(id);
    }
    async remove(id, user) {
        const task = await this.taskRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task)
            throw new Error('Tarea no encontrada');
        if (task.user.id !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('No tienes permisos para eliminar esta tarea');
        }
        await this.taskRepository.delete(id);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map