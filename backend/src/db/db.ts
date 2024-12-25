import mongoose from 'mongoose';
import { config } from '../config/config';

export const connectDB = async () => {
  await mongoose
    .connect(config.dbUri, {
      dbName: 'drive-me',
    })
    .then(() => {
      console.log('connected to db');
    })
    .catch((err) => {
      console.log(err);
    });
};
