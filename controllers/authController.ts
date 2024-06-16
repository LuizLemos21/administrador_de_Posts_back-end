// controllers/auth.ts
import { Request, Response } from 'express';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '5c8021837396142230b3f680c23844c1e88a05ba00609f8c1d285e257b0842e2';

export class AuthController {
  public async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      console.log('Login attempt with email:', email);
      console.log('Provided password:', senha);

      if (!senha) {
        return res.status(400).json({ message: 'Password is required.' });
      }

      const user = await User.findOne({ where: { email } });
      console.log('User found:', user);

      if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const isPasswordValid = user.validPassword(senha);
      console.log('Password validation result:', isPasswordValid);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const payload = { id: user.id, email: user.email };
      console.log('JWT payload:', payload);

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
      console.log('JWT Token created:', token);

      res.json({ message: 'Login successful', token, user });
    } catch (err) {
      console.error('Error during login:', err);
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error has occurred' });
      }
    }
  }
}