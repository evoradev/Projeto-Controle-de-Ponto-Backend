import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Task } from '../Task/Task';

@Entity('taskLists')
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //@OneToMany(() => Task, (task) => task.taskList)
  //tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(id: number, name: string, tasks: Task[], createdAt: Date, updatedAt: Date, ) {
    this.id = id;
    this.name = name;
    //this.tasks = tasks;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
