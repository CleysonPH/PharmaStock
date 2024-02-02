import { ServicesFactory } from '@/config/factories/services-factory';
import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const [tokenType, token] = authHeader.split(' ');
  if (tokenType !== 'Bearer' || !token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { tokenService } = ServicesFactory;

  try {
    const sub = await tokenService.getSubject(token);
    req.user = sub;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
