import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../entities/task.entity';
import { Category } from '../entities/category.entity';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    status?: string;
    categoryId?: number;
  }): Promise<{ data: Task[]; total: number; page: number; limit: number }> {
    const page = params.page && params.page > 0 ? Number(params.page) : 1;
    const limit = params.limit && params.limit > 0 ? Number(params.limit) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (params.status && Object.values(TaskStatus).includes(params.status as TaskStatus)) {
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

  async findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOne({ where: { id }, relations: ['user', 'category'] });
  }

  async create(taskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status, categoryId } = taskDto;
    const category = await this.taskRepository.manager.findOne(Category, { where: { id: categoryId } });
    if (!category) throw new Error('Categoría no encontrada');
    const newTask = this.taskRepository.create({
      title,
      description,
      status,
      category,
    });
    return this.taskRepository.save(newTask);
  }

  async update(id: number, taskDto: UpdateTaskDto, user: User): Promise<Task | null> {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['user'] });
    if (!task) throw new Error('Tarea no encontrada');
    if (task.user.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('No tienes permisos para editar esta tarea');
    }
    const updateData: any = { ...taskDto };
    if (taskDto.categoryId) {
      const category = await this.taskRepository.manager.findOne(Category, { where: { id: taskDto.categoryId } });
      if (!category) throw new Error('Categoría no encontrada');
      updateData.category = category;
      delete updateData.categoryId;
    }
    await this.taskRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number, user: User): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['user'] });
    if (!task) throw new Error('Tarea no encontrada');
    if (task.user.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('No tienes permisos para eliminar esta tarea');
    }
    await this.taskRepository.delete(id);
  }
}
