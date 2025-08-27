import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../entities/task.entity';

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

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  async update(id: number, task: Partial<Task>): Promise<Task | null> {
    await this.taskRepository.update(id, task);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
