import express from 'express';
import middleware from './middlewares/middleware'
import TaskController from './Controllers/TaskController/TaskController';

const router = express.Router();

router.post('/formulario',
    middleware.validateTitle,
    middleware.validateDescription,
    middleware.validateCompleted,
    middleware.validateTask,
    TaskController.exampleRoute);

export default router;