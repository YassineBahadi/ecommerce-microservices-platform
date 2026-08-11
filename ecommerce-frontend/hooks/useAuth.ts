'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();

  const login = useCallback(async () => {
    await signIn('keycloak', {
      callbackUrl: '/',
    });
  }, []);

  const logout = useCallback(async () => {
    await signOut({
      callbackUrl: '/login',
    });
  }, []);

  return {
    user: session?.user,
    accessToken: session?.accessToken,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    login,
    logout,
  };
}