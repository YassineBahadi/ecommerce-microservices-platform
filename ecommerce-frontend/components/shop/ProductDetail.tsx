'use client';

import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({
  product,
}: ProductDetailProps) {
  const addItem = useCartStore(
    (state) => state.addItem
  );

  const handleAddToCart = () => {
    // Vérifier le stock
    if (product.availableQuantity <= 0) {
      toast.error('Stock épuisé', {
        description:
          "Ce produit n'est plus disponible.",
      });

      return;
    }

    // Ajouter le produit au panier
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      availableQuantity: product.availableQuantity,
    });

    // Notification de succès
    toast.success('Ajouté au panier', {
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Retour */}
      <Link
        href="/products"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux produits
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image placeholder */}
        <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
          <span className="text-6xl">📦</span>
        </div>

        {/* Product information */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">
                {product.name}
              </h1>

              <Badge variant="secondary">
                {product.categoryName}
              </Badge>
            </div>

            <p className="mt-2 text-muted-foreground">
              {product.description}
            </p>
          </div>

          {/* Price and stock */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">
                {product.price.toFixed(2)} €
              </span>

              <Badge
                variant={
                  product.availableQuantity > 0
                    ? 'default'
                    : 'destructive'
                }
              >
                {product.availableQuantity > 0
                  ? `Stock: ${product.availableQuantity}`
                  : 'Rupture de stock'}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Catégorie: {product.categoryName}
            </p>
          </div>

          {/* Add to cart */}
          <Button
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.availableQuantity <= 0}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
}
