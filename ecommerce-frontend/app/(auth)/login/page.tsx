'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const handleLogin = async () => {
    await signIn('keycloak', {
      callbackUrl: '/',
    });
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Connexion
          </h1>

          <p className="mt-2 text-muted-foreground">
            Connectez-vous avec votre compte Keycloak
          </p>
        </div>

        <Button
          className="w-full"
          onClick={handleLogin}
        >
          Se connecter avec Keycloak
        </Button>
      </div>
    </div>
  );
}