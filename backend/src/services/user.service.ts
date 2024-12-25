import { IUser } from '../db/DbTypes';
import { UserModel } from '../models/user.model';

export const createUser = async (user: IUser) => {
  if (!user.fullName.firstName || !user.email || !user.password) {
    throw new Error('Invalid user data');
  }
  const newUser = await UserModel.create(user);
  return newUser;
};
