// middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret') as { id: number, email: string };
    req.user = decoded; // Attach decoded user info to req.user
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
