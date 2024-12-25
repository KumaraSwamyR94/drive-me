import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserModel } from '../../models/user.model';
import { config } from '../../config/config';
import { BlacklistTokenModel } from '../../models/blacklist-token.model';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const blacklistToken = await BlacklistTokenModel.findOne({ token });
    if (blacklistToken) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    (req as any).user = decoded as { _id: string };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
};
