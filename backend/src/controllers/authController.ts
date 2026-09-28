import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export const AuthController = {
  // POST /api/admin/login
  login: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    // Standard initial check for development/setup
    if (email === 'admin@puzzolana.com' && password === 'Puzzolana@2026') {
      const token = jwt.sign(
        { userId: 'admin_root', email, role: 'admin' },
        ENV.JWT_SECRET,
        { expiresIn: '7d' }
      );

      sendSuccess(res, {
        token,
        user: { id: 'admin_root', email, name: 'Puzzolana Platform Admin', role: 'admin' },
      }, 'Authentication successful');
      return;
    }

    sendError(res, 'Invalid credentials', 401);
  },

  // GET /api/admin/me
  getCurrentUser: async (req: Request, res: Response): Promise<void> => {
    sendSuccess(res, { role: 'admin', email: 'admin@puzzolana.com' }, 'User profile');
  },
};
