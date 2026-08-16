'use client';

import { useOrder } from '@/hooks/useOrder';
import { OrderDetail } from '@/components/orders/OrderDetail';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function OrderPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id ? parseInt(params.id as string) : undefined;

  const { order, lines, isLoading, error } = useOrder(id!);

  useEffect(() => {
    if (id === undefined || isNaN(id)) {
      router.push('/');
    }
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="py-12 text-center">
        <p className="text-destructive">
          Erreur lors du chargement de la commande.
        </p>
        <Button onClick={() => router.push('/')} className="mt-4">
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => router.push('/')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à l'accueil
      </Button>
      <OrderDetail order={order} lines={lines || []} />
    </div>
  );
}