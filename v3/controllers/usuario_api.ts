import { Request, Response } from 'express';
import { UsuarioAPIRedeSocial } from '../models/usuario_api';

export class UsuarioAPIRedeSocialController {
  public async getAll(req: Request, res: Response) {
    try {
      const connections = await UsuarioAPIRedeSocial.findAll();
      res.json(connections);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { usuarioId, apiRedeSocialId } = req.params;
      const { accessToken } = req.body;

      // Convert and validate the IDs
      const parsedUsuarioId = parseInt(usuarioId, 10);
      const parsedApiRedeSocialId = parseInt(apiRedeSocialId, 10);


      const connection = await UsuarioAPIRedeSocial.create({
        userId: parsedUsuarioId,
        APIRedeSocialId: parsedApiRedeSocialId,
        accessToken: accessToken
      });

      res.status(201).json(connection);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }


public async delete(req: Request, res: Response) {
    try {
      const {UserId, APIRedeSocialId} = req.params;
      let parsedUsuarioId = parseInt(UserId);  
      let parsedAPIRedeSocialId = parseInt(APIRedeSocialId);  
        

      const numDeleted = await UsuarioAPIRedeSocial.destroy({
        where: {UserId:parsedUsuarioId , APIRedeSocialId: parsedAPIRedeSocialId}
      });
      if (numDeleted > 0) {
        res.json({ message: "Connection deleted successfully." });
      } else {
        res.status(404).json({ error: "Connection not found." });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }
}