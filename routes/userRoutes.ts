import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';
import { PostController } from '../controllers/postController'; 
import { authMiddleware } from '../middlewares/authMiddleware';

const users = Router();
const userController = new UserController();
const authController = new AuthController();
const postController = new PostController(); 
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

// Add the route to get posts by user ID

export default users;
