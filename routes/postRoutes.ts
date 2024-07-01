import { Router } from 'express';
import { PostController } from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware';

const posts = Router();
const postController = new PostController();


posts.get('/posts', postController.getAllPosts);
posts.post('/post', postController.createPost);
posts.put('/post/:id', postController.updatePost);
posts.patch('/post/:id', postController.patchPost);
posts.delete('/post/:id', postController.deletePost);

posts.post('/posts/:id/publish', authMiddleware, postController.publishPost);

posts.get('/posts/:userId', postController.getPostsByUserId);

export default posts;
