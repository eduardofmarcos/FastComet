import { Router } from 'express';
import destinosController from './app/controllers/destinosController';
import userController from './app/controllers/userController';
import sessionController from './app/controllers/sessionController';
import authMiddleware from './app/middlewares/auth';
const routes = new Router();

//Users
routes.post('/users', userController.store);
//pega todos os destinatarios
routes.get('/destinos', destinosController.index);

routes.post('/sessions', sessionController.store);
//apenas logado
routes.post('/destinos', authMiddleware, destinosController.store);
//apenas logado e atualizado via id
//routes.put('/recipients/:id', updateRecipients);

export default routes;
