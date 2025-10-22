import { Request, Response, NextFunction } from 'express';
import connectToDB from '../utils/db';

export const ensureDBConnection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connectToDB();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
};
