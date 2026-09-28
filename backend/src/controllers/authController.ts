import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/authGuard';

export const AuthController = {
  // POST /api/admin/login
  login: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const authResult = await AuthService.login(email, password);

    if (!authResult) {
      sendError(res, 'Invalid email or password credentials', 401);
      return;
    }

    sendSuccess(
      res,
      {
        token: authResult.token,
        user: authResult.user,
      },
      'Admin authentication successful',
      200
    );
  },

  // GET /api/admin/me
  getCurrentUser: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      sendError(res, 'Unauthenticated user', 401);
      return;
    }

    const userProfile = await AuthService.getUserById(req.user.userId);
    if (!userProfile) {
      sendError(res, 'User record not found or deactivated', 404);
      return;
    }

    sendSuccess(res, userProfile, 'User profile retrieved');
  },

  // POST /api/admin/logout
  logout: async (req: Request, res: Response): Promise<void> => {
    sendSuccess(res, { loggedOut: true }, 'Successfully logged out');
  },
};
