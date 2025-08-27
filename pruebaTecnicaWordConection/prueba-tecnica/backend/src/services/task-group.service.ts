import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskGroup } from '../entities/task-group.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class TaskGroupService {
  constructor(
    @InjectRepository(TaskGroup)
    private readonly groupRepo: Repository<TaskGroup>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(name: string, ownerId: number): Promise<TaskGroup> {
    const owner = await this.userRepo.findOne({ where: { id: ownerId } });
    if (!owner) throw new ForbiddenException('Usuario no encontrado');
    const group = this.groupRepo.create({ name, owner });
    return this.groupRepo.save(group);
  }

  async findAllByOwner(ownerId: number): Promise<TaskGroup[]> {
    return this.groupRepo.find({ where: { owner: { id: ownerId } }, relations: ['owner', 'tasks'] });
  }

  async remove(id: number, ownerId: number): Promise<void> {
    const group = await this.groupRepo.findOne({ where: { id }, relations: ['owner'] });
    if (!group) throw new NotFoundException('Grupo no encontrado');
    if (group.owner.id !== ownerId) throw new ForbiddenException('No tienes permiso');
    await this.groupRepo.delete(id);
  }
}
