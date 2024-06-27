import express from 'express';
import userController from './Controllers/DoadorController/UserController';

const router = express.Router();

router.post('/insert', userController.insert)

router.post('/getOne', userController.getOneById)

router.post('/fingerPrintReciever', userController.recieveFingerprint)

export default router;