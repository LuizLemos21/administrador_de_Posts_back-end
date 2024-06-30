import { Request, Response } from 'express';
import { APIRedeSocial } from '../models/apiredesocialModel';
import { postToFacebook } from '../services/facebookService';
import { postToTwitter } from '../services/twitterService';
import { Post } from '../models/postModel';
import { postToLinkedIn } from '../services/linkedinService';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  token: string;
}

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
      const { conteudo, dataagendamento, likes, comentarios, favoritacoes, compartilhamentos, userid } = req.body;
      const post = await Post.create({
        conteudo,
        dataagendamento, likes, comentarios, favoritacoes, compartilhamentos,
        userid
      });

      res.status(201).json(post);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }

  public async publishPost(req: Request, res: Response): Promise<void> {
    const postId = req.params.id;
    const { platforms } = req.body;
    const message = "Your post message here"; // Replace this with the actual post message
    
    if (!req.user) {
      console.error("Unauthorized access: req.user is undefined");
      res.status(401).send('Unauthorized');
      return;
    }

    const user = req.user as User;
    if (!user.id) {
      console.error("User ID is required but not provided");
      res.status(400).send('User ID is required');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/apiredesocial`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const tokens = response.data;

      if (!Array.isArray(tokens)) {
        throw new Error("Expected an array of tokens from /apiredesocial endpoint");
      }

      const tokenMap: { [key: string]: string } = {};
      tokens.forEach((token: any) => {
        tokenMap[token.socialNetwork] = token.accesstoken;
      });

      console.log("Retrieved tokens:", tokenMap);

      for (const platform of platforms) {
        if (platform === 'facebook' && tokenMap['facebook']) {
          console.log(`Posting to Facebook with token: ${tokenMap['facebook']}`);
          await postToFacebook(tokenMap['facebook'], message);
        }
        if (platform === 'twitter' && tokenMap['twitter']) {
          console.log(`Posting to Twitter with token: ${tokenMap['twitter']}`);
          await postToTwitter(tokenMap['twitter'], message);
        }
        if (platform === 'linkedin' && tokenMap['linkedin']) {
          console.log(`Posting to LinkedIn with token: ${tokenMap['linkedin']}`);
          await postToLinkedIn(tokenMap['linkedin'], message, tokenMap['linkedinPersonURN']);
        }
      }

      res.status(200).send('Post created successfully on all platforms');
    } catch (err) {
      console.error("Error occurred during post publishing:", err);
      if (axios.isAxiosError(err)) {
        console.error("Axios error response data:", err.response?.data);
        console.error("Axios error response status:", err.response?.status);
        console.error("Axios error response headers:", err.response?.headers);
      } else if (err instanceof Error) {
        res.status(500).send(`Error creating post: ${err.message}`);
      } else {
        res.status(500).send('An unknown error occurred.');
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

  public async getPostsByUserId(req: Request, res: Response) {
    const userid = req.params.userId;

    try {
      const posts = await Post.findAll({ where: { userid } });
      res.json(posts);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }
}
