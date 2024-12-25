import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUser {
  fullName?: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  password: string;
  socketId?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

interface UserModel extends mongoose.Model<IUser, {}, IUserMethods> {
  hashPassword(password: string): Promise<string>;
}

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: { type: String, required: true, minLength: [3, 'First name must be at least 3 characters long'] },
    lastName: { type: String, required: false },
  },
  email: { type: String, required: true, unique: true, minLength: [5, 'Email must be valid'] },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: [8, 'Password must be at least 8 characters long'],
  },
  socketId: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, select: false },
  updatedAt: { type: Date, default: Date.now, select: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string);
  return token;
};

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

export const UserModel = mongoose.model<IUser, UserModel>('User', userSchema);
