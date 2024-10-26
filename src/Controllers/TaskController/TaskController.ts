import { Request, Response } from "express";
import { Repository } from "typeorm";
import Task from "../../Models/Task/Task"; 
import logger from "../../Log/logger";
import { AppDataSource } from "../../Database/data-source";

class TaskController {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
    this.insert = this.insert.bind(this);
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }


  async getAll(req: Request, res: Response) {
    try {
      const tasks = await this.taskRepository.find();
      return res.status(200).json(tasks);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async insert(req: Request, res: Response) {
    try {
      logger.debug(req.body);
      const newObject = Task.fromJson(req.body);
      logger.debug(newObject);
      const savedObject = await this.taskRepository.save(newObject);
      return res.status(201).json(savedObject);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const { title, description } = req.body;
  
      const existingTask = await this.taskRepository.findOne({ where: { id } });
  
      if (!existingTask) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      existingTask.title = title;
      existingTask.description = description; 
  
      await this.taskRepository.save(existingTask); 
  
      return res.status(200).json(existingTask); 
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
        const id: number = parseInt(req.params.id);
        const { completed } = req.body;

        const existingTask = await this.taskRepository.findOne({ where: { id } });

        if (!existingTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        existingTask.completed = completed;
        await this.taskRepository.save(existingTask);

        return res.status(200).json({ message: "Task updated successfully", completed: existingTask.completed });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

async delete(req: Request, res: Response) {
  try {
    const id: number = parseInt(req.params.id);
    const existingTask = await this.taskRepository.findOne({ where: { id } });

    if (existingTask) {
      await this.taskRepository.remove(existingTask);
      return res.status(200).json({ message: "Task deleted successfully" });
    } else {
      return res.status(404).json({ error: "Task not found" });
    }
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
}

export default new TaskController();
