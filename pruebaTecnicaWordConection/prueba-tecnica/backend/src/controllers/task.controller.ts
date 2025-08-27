import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { ValidationPipe } from '@nestjs/common';
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
  async create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) task: CreateTaskDto): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put(':id')
  async update(
  @Param('id') id: number,
  @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) task: UpdateTaskDto,
  @Req() req: any
    ): Promise<Task | null> {
      const user = req.user;
      return this.taskService.update(id, task, user);
    }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req: any): Promise<void> {
      const user = req.user;
      return this.taskService.remove(id, user);
  }
}
