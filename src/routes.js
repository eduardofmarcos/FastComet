import { Router } from 'express';
import destinosController from './app/controllers/destinosController';

const routes = new Router();

//pega todos os destinatarios
routes.get('/destinos', destinosController.index);

//apenas logado
routes.post('/destinos', destinosController.store);
//apenas logado e atualizado via id
//routes.put('/recipients/:id', updateRecipients);

export default routes;
