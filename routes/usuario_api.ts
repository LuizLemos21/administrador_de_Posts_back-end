import { Router } from 'express';
import { UsuarioAPIRedeSocialController } from '../controllers/usuario_apiController';

const usuarioAPIRedeSocialRouter = Router();
const usuarioAPIRedeSocialController = new UsuarioAPIRedeSocialController();

usuarioAPIRedeSocialRouter.get('/user/api', usuarioAPIRedeSocialController.getAll);
usuarioAPIRedeSocialRouter.post('/user/:id/api/:id', usuarioAPIRedeSocialController.create);
usuarioAPIRedeSocialRouter.delete('/user/:id/api/:id', usuarioAPIRedeSocialController.delete);

export default usuarioAPIRedeSocialRouter;
