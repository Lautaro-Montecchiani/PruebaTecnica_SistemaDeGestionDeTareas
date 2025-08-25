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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'usuario',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'wordconnection',
      entities: [User, Task, Category],
      synchronize: true, // Solo para desarrollo
    }),
    TypeOrmModule.forFeature([User, Task, Category]),
    AuthModule,
  ],
  controllers: [TaskController, CategoryController, UserController],
  providers: [TaskService, CategoryService, UserService],
})
export class AppModule {}
