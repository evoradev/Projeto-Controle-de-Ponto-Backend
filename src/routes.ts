import express from 'express';
import userController from './Controllers/DoadorController/UserController';
import middleware from './middlewares/middleware'


const router = express.Router();

router.post('/insert', userController.insert)

/*
router.post('/formulario',
    middleware.validateText,
    middleware.validateInteger,
    middleware.validateBoolean,
    middleware.validateDropbox,
    middleware.validateRadioButton,
    dataController.exampleRoute);
*/
export default router;