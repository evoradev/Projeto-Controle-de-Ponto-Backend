import { Request, Response } from "express";
import { Repository } from "typeorm";
import Task from "../../Models/Task/Task"; 
import logger from "../../Log/logger";
import { AppDataSource } from "../../Database/data-source";

class TaskController {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);

    // Bind the context of 'this' to the methods
    this.insert = this.insert.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getOneById = this.getOneById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }


  public exampleRoute(req: Request, res: Response): void {
    let newObject = Task.fromJson(req.body);

    logger.info(newObject);

    res.json(newObject);
  }

  public async insert(req: Request, res: Response) {
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

  async getOne(req: Request, res: Response) {
    try {
      const tasks = await this.taskRepository.find();
      return res.json(tasks);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getOneById(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const task = await this.taskRepository.findOne({ where: { id } });

      if (task) {
        return res.json(task);
      } else {
        return res.status(404).json({ error: "Task not found" });
      }
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const updatedTask = req.body as Task;
      const existingTask = await this.taskRepository.findOne({ where: { id } });

      if (existingTask) {
        await this.taskRepository.save({ ...existingTask, ...updatedTask });
        return res.status(200).json({ message: "Task updated successfully" });
      } else {
        return res.status(404).json({ error: "Task not found" });
      }
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
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
