import { Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

export class AuthController {
  public async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user || !user.validPassword(senha)) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

      res.json({ message: 'Login successful', token });
    } catch (err) {
      if (err instanceof Error){
       res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error has occured' });
      }
    }
  }
}
