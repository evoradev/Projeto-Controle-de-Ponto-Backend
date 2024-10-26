import "reflect-metadata";
import { DataSource } from "typeorm";
import Task from '../Models/Task/Task';
import TaskMigrations from "./migrations/1729871533067-CreateTasksTable";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    database: "TodoList",
    synchronize: true,
    logging: true,
    entities: [Task],
    migrations: [TaskMigrations],
    subscribers: [],
});
