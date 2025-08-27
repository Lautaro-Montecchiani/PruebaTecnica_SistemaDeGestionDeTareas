import { IsNotEmpty, IsString, IsOptional, IsEnum, IsInt } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Estado inválido' })
  status?: TaskStatus;

  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @IsInt({ message: 'La categoría debe ser un número' })
  categoryId!: number;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Estado inválido' })
  status?: TaskStatus;

  @IsOptional()
  @IsInt({ message: 'La categoría debe ser un número' })
  categoryId?: number;
}
