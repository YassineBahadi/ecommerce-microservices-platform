import { productService } from '@/services/product.service';
import { ProductList } from '@/components/shop/ProductList';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await productService.getAllProducts();

  return (
    <div className="space-y-8">
      <section className="text-center py-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
        <h1 className="text-4xl font-bold tracking-tight">
          Bienvenue sur E-Shop
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Découvrez notre sélection de produits de qualité
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Nos Produits</h2>
        <ProductList products={products} />
      </section>
    </div>
  );
}