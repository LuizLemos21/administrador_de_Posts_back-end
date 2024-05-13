import { Router } from 'express';
import  { UserController }   from '../controllers/user';

const users = Router();
const userController = new UserController();

//rotas para user

users.get('/users', userController.getAllUsers);
users.post('/user', userController.createUser);
users.put('/user/:id', userController.updateUser);
users.patch('/user/:id', userController.patchUser);
users.delete('/user/:id', userController.deleteUser);


export default users;
