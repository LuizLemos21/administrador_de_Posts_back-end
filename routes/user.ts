import { Router } from 'express';
import { UserController } from '../controllers/user';
import { AuthController } from '../controllers/auth';
import { authMiddleware } from '../middlewares/auth';

const users = Router();
const userController = new UserController();
const authController = new AuthController();

// User CRUD routes
users.get('/users', userController.getAllUsers);
users.post('/user', userController.createUser);
users.put('/user/:id', userController.updateUser);
users.patch('/user/:id', userController.patchUser);
users.delete('/user/:id', userController.deleteUser);

// Authentication routes
users.post('/login', authController.login);

// Protected route example
users.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route." });
});

export default users;
