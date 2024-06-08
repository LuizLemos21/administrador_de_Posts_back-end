import { Request, Response } from 'express';
import { Post } from '../models/post'; 
import { postToFacebook } from '../services/facebookService';
import { postToTwitter } from '../services/twitterService';
import { postToLinkedIn } from '../services/linkedinService';



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

  public async createPost(req: Request, res: Response): Promise<void> {
    const { message, facebookAccessToken, twitterAccessToken, linkedinAccessToken, linkedInPersonURN } = req.body;

    try {
      if (facebookAccessToken) {
        await postToFacebook(facebookAccessToken, message);
      }
      if (twitterAccessToken) {
        await postToTwitter(twitterAccessToken, message);
      }
      if (linkedinAccessToken) {
        await postToLinkedIn(linkedinAccessToken, message, linkedInPersonURN );
      }
      res.status(200).send('Post created successfully on all platforms');
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(`Error creating post: ${err.message}`);
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

  public async patchPost(req: Request, res: Response) {
    try {
        const postId = req.params.id;
        const postToUpdate = req.body; // Dados enviados na solicitação PATCH

        // Verificar se o post existe
        const existingPost = await Post.findByPk(postId);
        if (!existingPost) {
            return res.status(404).json({ error: "Post not found." });
        }

        // Atualizar apenas os campos fornecidos na solicitação PATCH
        await Post.update(postToUpdate, {
            where: { id: postId }
        });

        // Recuperar o post atualizado do banco de dados
        const updatedPost = await Post.findByPk(postId);

        // Retornar o post atualizado como resposta
        res.json({ message: "Post updated successfully.", post: updatedPost });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
}

}
