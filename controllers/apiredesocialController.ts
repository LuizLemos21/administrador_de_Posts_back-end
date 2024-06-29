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

  public async storeUserData(req: Request, res: Response) {
    try {
      const { userid, username, socialNetwork, accessToken } = req.body;

      const endpoints: { [key: string]: string } = {
        twitter: 'https://api.twitter.com/2/tweets',
        facebook: 'https://graph.facebook.com/v12.0/me/feed',
        linkedin: 'https://api.linkedin.com/v2/shares'
      };
      
      const endpoint = endpoints[socialNetwork.toLowerCase()];
      
      if (!endpoint) {
        return res.status(400).json({ error: 'Invalid social network' });
      }

      await APIRedeSocial.create({
        nome: username ,
        endpoint: endpoint,
        userid: userid,
        accesstoken: accessToken,
        SocialNetwork: socialNetwork
      });

      res.status(200).send('User data stored successfully');
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }

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
