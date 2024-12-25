import { Schema, model } from 'mongoose';

export const BlacklistTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24,
  },
});

export const BlacklistTokenModel = model('BlacklistToken', BlacklistTokenSchema);
