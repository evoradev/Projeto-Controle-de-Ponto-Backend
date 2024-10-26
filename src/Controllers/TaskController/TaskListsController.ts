import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { TaskList } from '../../Models/TaskList/TaskList';
import { AppDataSource } from '../../Database/data-source';

class TaskListController {
    private taskListRepository: Repository<TaskList>;

    constructor() {
        this.taskListRepository = AppDataSource.getRepository(TaskList);

        this.createTaskList = this.createTaskList.bind(this);
        this.getAllTaskLists = this.getAllTaskLists.bind(this);
        this.deleteTaskList = this.deleteTaskList.bind(this);
    }

    async getAllTaskLists(req: Request, res: Response) {
        try {
            const taskLists = await this.taskListRepository.find({ relations: ['tasks'] });
            return res.status(200).json(taskLists);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createTaskList(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const newTaskList = this.taskListRepository.create({ name });
            const savedTaskList = await this.taskListRepository.save(newTaskList);
            return res.status(201).json(savedTaskList);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deleteTaskList(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id);
            const taskList = await this.taskListRepository.findOne({ where: { id } });

            if (taskList) {
                await this.taskListRepository.remove(taskList);
                return res.status(200).json({ message: 'Task list deletada' });
            } else {
                return res.status(404).json({ error: 'Task list não encontrada' });
            }
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new TaskListController();