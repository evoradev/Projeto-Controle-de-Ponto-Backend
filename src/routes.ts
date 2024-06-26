import express from 'express';
import userController from './Controllers/DoadorController/UserController';

const router = express.Router();

router.post('/insert', userController.insert)

router.post('/getOne', userController.getOneById)

export default router;