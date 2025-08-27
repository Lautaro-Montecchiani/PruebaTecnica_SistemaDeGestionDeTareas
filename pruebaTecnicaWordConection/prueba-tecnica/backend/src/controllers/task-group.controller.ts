import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { TaskGroupService } from '../services/task-group.service';
import { TaskGroup } from '../entities/task-group.entity';

@Controller('task-groups')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskGroupController {
  constructor(private readonly taskGroupService: TaskGroupService) {}

  @Post()
  @Roles(UserRole.PREMIUM)
  async create(@Body() body: { name: string }, @Request() req: any): Promise<TaskGroup> {
    return this.taskGroupService.create(body.name, req.user.id);
  }

  @Get()
  @Roles(UserRole.PREMIUM)
  async findAll(@Request() req: any): Promise<TaskGroup[]> {
    return this.taskGroupService.findAllByOwner(req.user.id);
  }

  @Delete(':id')
  @Roles(UserRole.PREMIUM)
  async remove(@Param('id') id: number, @Request() req: any): Promise<void> {
    return this.taskGroupService.remove(id, req.user.id);
  }
}
