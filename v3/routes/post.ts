import { Router } from 'express';
import  { PostController }   from '../controllers/post';

const users = Router();
const postController = new PostController();

users.get('/posts', postController.getAllPosts);
users.post('/post', postController.createPost);
users.put('/post/:id', postController.updatePost);
users.delete('/post/:id', postController.deletePost);


export default users;
