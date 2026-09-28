'use client';

import { useState, useEffect, useCallback } from 'react';
import { AuthManager, AdminUser } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = AuthManager.getToken();
    const savedUser = AuthManager.getUser();

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((newToken: string, newUser: AdminUser) => {
    AuthManager.saveSession(newToken, newUser);
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    AuthManager.clearSession();
    setToken(null);
    setUser(null);
  }, []);

  return {
    user,
    token,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin',
    isEditor: user?.role === 'editor' || user?.role === 'admin',
    isLoading,
    login,
    logout,
  };
}
