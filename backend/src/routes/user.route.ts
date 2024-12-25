import express from 'express';
import { body } from 'express-validator';

import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/user.controller';
import { handleValidationErrors } from '../services/middlewares/express-validator.middleware';
import { authenticateUser } from '../services/middlewares/authetication.middleware';

const router = express.Router();

router.post(
  '/register',
  [
    body('fullName.firstName')
      .isString()
      .isLength({ min: 3 })
      .withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isString().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  ],
  handleValidationErrors,
  registerUser,
);

router.post(
  '/login',
  [
    body('email').isString().isLength({ min: 5 }).withMessage('Email is required'),
    body('password').isString().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  ],
  handleValidationErrors,
  loginUser,
);

router.get('/profile', authenticateUser, getUserProfile);

router.post('/logout', authenticateUser, logoutUser);

export default router;
