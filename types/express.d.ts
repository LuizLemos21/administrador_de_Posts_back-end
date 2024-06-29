// types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload; // Adjust based on your jwt.verify return type
  }
}

import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}
