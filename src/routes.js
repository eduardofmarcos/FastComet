import { Router } from 'express';
import destinosController from './app/controllers/destinosController';
import userController from './app/controllers/userController';
import sessionController from './app/controllers/sessionController';
import deliverymenController from './app/controllers/deliverymenController';
import deliverymanController from './app/controllers/deliverymanController';
import filesController from './app/controllers/filesController';
import filesSignController from './app/controllers/filesSignController';
import orderController from './app/controllers/orderController';
import orderProblemsController from './app/controllers/orderProblemsController';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

/** USERS- ADMIN **/
routes.post('/users', userController.store);

/** LOGIN **/
routes.post('/sessions', sessionController.store);

/** DESTINOS **/
routes.get('/destinos', destinosController.index);
//apenas logado
routes.post('/destinos', authMiddleware, destinosController.store);
//apenas logado e atualizado via id
routes.put('/destinos/:id', authMiddleware, destinosController.update);

/** DELIVERYMAN**/
routes.post('/files/avatar', upload.single('file'), filesController.store);

routes.get('/deliverymen', deliverymenController.index);
routes.post('/deliverymen', deliverymenController.store);
routes.put('/deliverymen/:id', deliverymenController.update);
routes.delete('/deliverymen/:id', deliverymenController.delete);

/** DELIVERYMAN FUNCIONALITIES**/
routes.get('/deliveryman/:id/deliveries', deliverymanController.index);
routes.get(
  '/deliveryman/:id/deliveries/delivered',
  deliverymanController.index
);
routes.post(
  '/files/signatures/:orderId',
  upload.single('file'),
  filesSignController.store
);

routes.put(
  '/deliveryman/:id/deliveries/:orderId',
  deliverymanController.update
);

/** ORDERS**/

routes.get('/orders', orderController.index);
routes.post('/orders', orderController.store);
routes.put('/orders/:id', orderController.update);
routes.delete('/orders/:id', orderController.delete);

/** ORDERS PROBLEMS**/
routes.get('/orders/problems', orderProblemsController.index);
routes.get('/orders/:id/problems', orderProblemsController.show);
routes.post('/orders/:id/problems', orderProblemsController.store);
routes.delete(
  '/orders/:problemId/cancel-order',
  orderProblemsController.delete
);

export default routes;
