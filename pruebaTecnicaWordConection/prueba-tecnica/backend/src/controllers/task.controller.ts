import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TaskService } from '../services/task.service';
import { Task } from '../entities/task.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
    @Query('categoryId') categoryId?: number
  ): Promise<{ data: Task[]; total: number; page: number; limit: number }> {
    return this.taskService.findAll({ page, limit, status, categoryId });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Task | null> {
    return this.taskService.findOne(id);
  }

  @Post()
  async create(@Body() task: Partial<Task>): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() task: Partial<Task>): Promise<Task | null> {
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.taskService.remove(id);
  }
}
