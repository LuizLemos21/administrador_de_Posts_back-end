import { Request, Response } from 'express';
import { Post } from '../models/post'; 

export class PostController {
  public async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }

  public async createPost(req: Request, res: Response) {
    try {
      const post = await Post.create(req.body);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }

  public async updatePost(req: Request, res: Response) {
    try {
      const updatedPost = await Post.update(req.body, {
        where: { id: req.params.id }
      });
      if (updatedPost[0] > 0) {
        res.json({ message: "Post updated successfully." });
      } else {
        res.status(404).json({ error: "Post not found." });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred." });
      }
    }
  }

  public async deletePost(req: Request, res: Response) {
    try {
      const numDeletedPosts = await Post.destroy({
        where: { id: req.params.id }
      });
      if (numDeletedPosts > 0) {
        res.json({ message: "Post deleted successfully." });
      } else {
        res.status(404).json({ error: "Post not found." });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred." });
      }
    }
  }
}
