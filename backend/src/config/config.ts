import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI || 'mongodb://0.0.0.0/drive-me-db',
  jwtSecret: process.env.JWT_SECRET || 'drive-me-secret',
};
