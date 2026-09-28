/**
 * Frontend Authentication & Token Manager for Puzzolana Admin Portal
 */

const TOKEN_STORAGE_KEY = 'puzzolana_admin_token';
const USER_STORAGE_KEY = 'puzzolana_admin_user';

export interface AdminUser {
  userId: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export const AuthManager = {
  saveSession: (token: string, user: AdminUser): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    }
    return null;
  },

  getUser: (): AdminUser | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(USER_STORAGE_KEY);
      if (userStr) {
        try {
          return JSON.parse(userStr) as AdminUser;
        } catch {
          return null;
        }
      }
    }
    return null;
  },

  clearSession: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  },

  isAuthenticated: (): boolean => {
    return !!AuthManager.getToken();
  },

  getAuthHeaders: (): Record<string, string> => {
    const token = AuthManager.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};
