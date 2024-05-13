import { Router } from 'express';
import  { PostController }   from '../controllers/post';

const posts = Router();
const postController = new PostController();

posts.get('/posts', postController.getAllPosts);
posts.post('/post', postController.createPost);
posts.put('/post/:id', postController.updatePost);
posts.patch('/post/:id', postController.patchPost);
posts.delete('/post/:id', postController.deletePost);


export default posts;
