import Link from 'next/link';
import { auth } from './auth';

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold">Bienvenue sur E-Shop</h1>

      {session ? (
        <div className="mt-4">
          <p className="text-lg">
            Connecté en tant que : {session.user?.name} ({session.user?.email})
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Access Token : {session.accessToken?.slice(0, 30)}...
          </p>
          <Link href="/api/auth/session" className="text-primary underline">
            Voir la session
          </Link>
        </div>
      ) : (
        <p className="mt-4 text-lg text-muted-foreground">
          Vous n'êtes pas connecté.
          <Link href="/login" className="text-primary underline ml-2">
            Se connecter
          </Link>
        </p>
      )}
    </div>
  );
}