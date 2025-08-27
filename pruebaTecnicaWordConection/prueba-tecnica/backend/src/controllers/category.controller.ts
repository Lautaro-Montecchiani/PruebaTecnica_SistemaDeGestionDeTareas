import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { CategoryService } from '../services/category.service';
import { Category } from '../entities/category.entity';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category | null> {
    return this.categoryService.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() category: Partial<Category>): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: number, @Body() category: Partial<Category>): Promise<Category | null> {
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
