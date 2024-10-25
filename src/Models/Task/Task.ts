import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(id: number, title: string, description: string, completed: boolean = false, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt
    }
    
    public static fromJson(json: Task): Task {
        return new Task(
            json.id,
            json.title,
            json.description,
            json.completed,
            json.createdAt,
            json.updatedAt
        );
    }
}

export default Task;