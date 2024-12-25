import { NextFunction, Request, Response } from 'express';

import { createUser } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { BlacklistTokenModel } from '../models/blacklist-token.model';

export const registerUser = async (req: Request, resp: Response) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await UserModel.hashPassword(password);
    const newUser = await createUser({ fullName, email, password: hashedPassword });
    const token = newUser.generateAuthToken();

    resp.status(201).json({ message: 'User created successfully', token, user: newUser });
    return;
  } catch (err) {
    console.error(err);
    resp.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const loginUser = async (req: Request, resp: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      resp.status(400).json({ message: 'Invalid email or password' });
      return;
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      resp.status(400).json({ message: 'Invalid email or password' });
      return;
    }
    const token = user.generateAuthToken();
    resp.status(200).json({ message: 'Login successful', token });
    return;
  } catch (err) {
    console.error(err);
    resp.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const logoutUser = async (req: Request, resp: Response) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  await BlacklistTokenModel.create({ token });
  resp.status(200).json({ message: 'Logout successful' });
  return;
};

export const getUserProfile = async (req: Request, resp: Response) => {
  const user = (req as any).user;
  if (!user) {
    resp.status(401).json({ message: 'User not authenticated' });
    return;
  }
  const userId = user._id;
  const userData = await UserModel.findById(userId);
  resp.status(200).json({ message: 'User fetched successfully', user: userData });
  return;
};
