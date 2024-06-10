import { Request, Response } from 'express';
import { APIRedeSocial } from '../models/apiredesocialModel';

export class APIRedeSocialController {
  public async getAllAPIRedeSocial(req: Request, res: Response) {
    try {
      const apiRedeSocial = await APIRedeSocial.findAll();
      res.json(apiRedeSocial);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }

  public async storeUserData(req: Request, res: Response){
    try {
<<<<<<< HEAD
      const { userId } = req.params;
      const { username, endpoint, accessToken, socialNetwork } = req.body;
      // Assuming you have a User model and a method to update user data
      await APIRedeSocial.create(
        {
            nome: username,
            endpoint: endpoint,
            userId: userId,
            accessToken: accessToken,
            socialNetwork: socialNetwork
          
        }
      );
      res.status(200).send('User data stored successfully');
    } catch (error) {
      if (error instanceof Error) {
        // Now TypeScript knows that 'err' is an Error object
        res.status(500).json({ error:   error.message });
=======
      const apiRedeSocial = await APIRedeSocial.create(req.body);
      res.status(201).json(apiRedeSocial);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
>>>>>>> parent of eadc297 (integration 2)
      } else {
        // You can add some generic error handling here
        res.status(500).json({ error: 'An unknown error occurred.' });
<<<<<<< HEAD
      }    }
  };
  
  
=======
      }
    }
  }
>>>>>>> parent of eadc297 (integration 2)

  public async updateAPIRedeSocial(req: Request, res: Response) {
    try {
      const updatedAPIRedeSocial = await APIRedeSocial.update(req.body, {
        where: { id: req.params.id }
      });
      if (updatedAPIRedeSocial[0] > 0) {
        res.json({ message: "APIRedeSocial updated successfully." });
      } else {
        res.status(404).json({ error: "APIRedeSocial not found." });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred." });
      }
    }
  }

  public async deleteAPIRedeSocial(req: Request, res: Response) {
    try {
      const numDeletedAPIRedeSocial = await APIRedeSocial.destroy({
        where: { id: req.params.id }
      });
      if (numDeletedAPIRedeSocial > 0) {
        res.json({ message: "APIRedeSocial deleted successfully." });
      } else {
        res.status(404).json({ error: "APIRedeSocial not found." });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred." });
      }
    }
  }

  public async patchAPIRedeSocial(req: Request, res: Response) {
    try {
      const apiRedeSocialId = req.params.id;
      const apiRedeSocialToUpdate = req.body;

      const existingAPIRedeSocial = await APIRedeSocial.findByPk(apiRedeSocialId);
      if (!existingAPIRedeSocial) {
        return res.status(404).json({ error: "APIRedeSocial not found." });
      }

      await APIRedeSocial.update(apiRedeSocialToUpdate, {
        where: { id: apiRedeSocialId }
      });

      const updatedAPIRedeSocial = await APIRedeSocial.findByPk(apiRedeSocialId);
      res.json({ message: "APIRedeSocial updated successfully.", apiRedeSocial: updatedAPIRedeSocial });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred." });
      }
    }
  }
}
