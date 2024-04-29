import { Router } from 'express';
import  { UserController }   from '../controllers/user';

const users = Router();
const userController = new UserController();

users.get('/users', userController.createUser);
users.post('/user', userController.createUser);
users.put('/user/:id', userController.updateUser);
users.delete('/user/:id', userController.deleteUser);


export default users;
