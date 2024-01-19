import { Request, Response } from 'express';

export const getToken = (req: Request, res: Response): void => {
  res.json({ message: 'Example Controller - GET Request' });
};