import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Post()
  async create(@Body() task: Partial<Task>): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() task: Partial<Task>): Promise<Task> {
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.taskService.remove(id);
  }
}
