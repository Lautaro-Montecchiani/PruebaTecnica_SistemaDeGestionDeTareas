import { TaskGroupService } from './services/task-group.service';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Task } from './entities/task.entity';
import { Category } from './entities/category.entity';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TaskGroup } from './entities/task-group.entity';
import { TaskGroupController } from './controllers/task-group.controller';

import { AnalyticsController } from './controllers/analytics.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tasks',
  entities: [User, Task, Category, TaskGroup],
      synchronize: true, // Solo para desarrollo
    }),
  TypeOrmModule.forFeature([User, Task, Category, TaskGroup]),
    AuthModule,
  ],
  controllers: [TaskController, CategoryController, UserController, TaskGroupController, AnalyticsController],
  providers: [TaskService, CategoryService, UserService, TaskGroupService],
})
export class AppModule {}
