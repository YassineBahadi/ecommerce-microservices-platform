'use client';

import { useProducts } from '@/hooks/useProducts';
import { ProductList } from '@/components/shop/ProductList';

export default function HomePage() {
  const { data: products, isLoading, error } = useProducts();

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-destructive">
          Erreur lors du chargement des produits : {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Bienvenue sur E-Shop
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Découvrez notre sélection de produits de qualité
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">Nos Produits</h2>
        <ProductList products={products || []} isLoading={isLoading} />
      </section>
    </div>
  );
}