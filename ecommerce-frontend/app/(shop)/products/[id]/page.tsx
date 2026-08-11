'use client';

import { ProductDetail } from '@/components/shop/ProductDetail';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useProduct } from '@/hooks/useProducts';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id ? parseInt(params.id as string) : undefined;

  const { data: product, isLoading, error } = useProduct(id!);

  // Rediriger si l'ID est invalide
  useEffect(() => {
    if (id === undefined || isNaN(id)) {
      router.push('/');
    }
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-12 text-center">
        <p className="text-destructive">
          Erreur lors du chargement du produit.
        </p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 text-primary underline"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <ProductDetail product={product} />
    </div>
  );
}