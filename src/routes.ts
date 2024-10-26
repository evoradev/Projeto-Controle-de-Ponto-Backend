import express from 'express';
import middleware from './middlewares/middleware'
import TaskController from './Controllers/TaskController/TaskController';
import TaskListsController from './Controllers/TaskController/TaskListsController';

const router = express.Router();

router.post('/insert', middleware.validateTitle,
    middleware.validateDescription,
    TaskController.insert);

router.post('/update/:id', TaskController.update);

router.get('/getall', TaskController.getAll);

router.delete('/delete/:id', TaskController.delete);

router.post('/updateTask/:id',
    middleware.validateTitle,
    middleware.validateDescription,
    TaskController.updateTask);

router.post('/insertTl', TaskListsController.createTaskList);

router.get('/getallTl', TaskListsController.getAllTaskLists);

router.delete('/deleteTl/:id', TaskListsController.deleteTaskList);

export default router;