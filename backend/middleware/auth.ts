import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface JwtPayload {
  _id: string;
  [key: string]: any;
}

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = authHeader.replace('Bearer ', '');
    console.log('token ----> ', token);

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;

    if (!decoded || !decoded._id) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    console.log('in middleware *** ', decoded);

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();

  } catch (err) {
    console.log('Authentication error:', err);
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};

export { authenticate };