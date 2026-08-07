import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = useCallback(async (email: string, password: string) => {
    try {
      await signIn('keycloak', { 
        callbackUrl: '/',
        email,
        password
      });
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut({ callbackUrl: '/login' });
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