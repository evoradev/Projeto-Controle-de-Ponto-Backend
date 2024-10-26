import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { TaskList } from '../TaskList/TaskList';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    completed: boolean;

    //@ManyToOne(() => TaskList, (taskList) => taskList.tasks)
    //taskList?: TaskList;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(id: number, title: string, description: string, completed: boolean = false, /*taskList?: TaskList,*/ createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
       // this.taskList = taskList;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    public static fromJson(json: Task): Task {
        return new Task(
            json.id,
            json.title,
            json.description,
            json.completed,
           // json.taskList,
            json.createdAt,
            json.updatedAt
        );
    }
}

export default Task;
