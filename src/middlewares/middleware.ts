import { Request, Response, NextFunction } from 'express';
import logger from '../Log/logger';

const handleValidationError = (error: Error, res: Response) => {
    logger.error(error.message);
    res.status(400).json({ error: error.message });
};

const middleware = {
    validateTitle: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title } = req.body;
            if (typeof title !== 'string' || title.length < 2 || title.length > 255) {
                throw new Error('Título deve ser uma string entre 2 e 255 caracteres');
            }
            next();
        } catch (error: any) {
            handleValidationError(error, res);
        }
    },

    validateDescription: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { description } = req.body;
            if (typeof description !== 'string' || description.length < 2 || description.length > 500) {
                throw new Error('Descrição deve ser uma string entre 2 e 500 caracteres');
            }
            next();
        } catch (error: any) {
            handleValidationError(error, res);
        }
    },

    validateCompleted: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { completed } = req.body;
            if (completed !== undefined && typeof completed !== 'boolean') {
                throw new Error('Campo "completed" deve ser um booleano');
            }
            next();
        } catch (error: any) {
            handleValidationError(error, res);
        }
    },

    validateTask: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, description, completed } = req.body;

            // Verifica se o título e descrição estão presentes
            if (!title || !description) {
                throw new Error('Título e descrição são obrigatórios');
            }

            // Chama as validações individuais
            middleware.validateTitle(req, res, next);
            middleware.validateDescription(req, res, next);
            middleware.validateCompleted(req, res, next);
        } catch (error: any) {
            handleValidationError(error, res);
        }
    }
}

export default middleware;
