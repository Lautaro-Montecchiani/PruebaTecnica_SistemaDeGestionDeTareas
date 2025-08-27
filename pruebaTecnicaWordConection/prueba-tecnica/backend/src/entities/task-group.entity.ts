import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity('task_groups')
export class TaskGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => User, user => user.id)
  owner!: User;

  @OneToMany(() => Task, task => task.group)
  tasks!: Task[];
}
