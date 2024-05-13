import { Request, Response } from 'express';
import { User } from '../models/user';

export class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
        if (err instanceof Error) {
            // Now TypeScript knows that 'err' is an Error object
            res.status(500).json({ error: err.message });
          } else {
            // You can add some generic error handling here
            res.status(500).json({ error: 'An unknown error occurred.' });
          }
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
        if (err instanceof Error) {
            // Now TypeScript knows that 'err' is an Error object
            res.status(500).json({ error: err.message });
          } else {
            // You can add some generic error handling here
            res.status(500).json({ error: 'An unknown error occurred.' });
          }
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await User.update(req.body, {
        where: { id: req.params.id }
      });
      if (updatedUser[0] > 0) {
        res.json({ message: "User updated successfully." });
      } else {
        res.status(404).json({ error: "User not found." });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred." });
      }
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const numDeletedUsers = await User.destroy({
        where: { id: req.params.id }
      });
      if (numDeletedUsers > 0) {
        res.json({ message: "User deleted successfully." });
      } else {
        res.status(404).json({ error: "User not found." });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred." });
      }
    }
  }


  public async patchUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const userToUpdate = req.body; // Dados enviados na solicitação PATCH

      // Verificar se o usuário existe
      const existingUser = await User.findByPk(userId);
      if (!existingUser) {
          return res.status(404).json({ error: "User not found." });
      }

      // Atualizar apenas os campos fornecidos na solicitação PATCH
      await User.update(userToUpdate, {
          where: { id: userId }
      });

      // Recuperar o usuário atualizado do banco de dados
      const updatedUser = await User.findByPk(userId);

      // Retornar o usuário atualizado como resposta
      res.json({ message: "uSER updated successfully.", user: updatedUser });
  } catch (err) {
      if (err instanceof Error) {
          res.status(500).json({ error: err.message });
      } else {
          res.status(500).json({ error: "An unknown error occurred." });
      }
  }

  }


}
