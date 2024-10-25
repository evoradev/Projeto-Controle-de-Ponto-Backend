import express from 'express';
import middleware from './middlewares/middleware'
import TaskController from './Controllers/TaskController/TaskController';

const router = express.Router();

router.post('/insert', middleware.validateTitle,
    middleware.validateDescription,
    TaskController.insert);

router.post('/update/:id', TaskController.update);

router.get('/getall', TaskController.getAll);

router.delete('/delete/:id', TaskController.delete);

router.put('updateTask/:id',
    middleware.validateTitle,
    middleware.validateDescription,
    TaskController.updateTask);

export default router;