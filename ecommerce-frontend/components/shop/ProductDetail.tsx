'use client';

import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, ArrowLeft, Package, Tag, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (product.availableQuantity <= 0) {
      toast.error('Stock épuisé', {
        description: 'Ce produit n\'est plus disponible.',
      });
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      availableQuantity: product.availableQuantity,
    });

    toast.success('Ajouté au panier', {
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  const isInStock = product.availableQuantity > 0;

  return (
    <div className="space-y-6">
      {/* Lien de retour */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux produits
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image / Zone visuelle */}
        <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
          <Package className="h-32 w-32 text-muted-foreground/50" />
        </div>

        {/* Informations */}
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <Badge variant="secondary">{product.categoryName}</Badge>
            </div>
            <p className="mt-2 text-muted-foreground">{product.description}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">
                {product.price.toFixed(2)} €
              </span>
              <Badge variant={isInStock ? 'default' : 'destructive'} className="text-sm">
                {isInStock ? `${product.availableQuantity} en stock` : 'Rupture de stock'}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>Catégorie : {product.categoryName}</span>
              </div>
              <div className="flex items-center gap-1">
                <ShoppingBag className="h-4 w-4" />
                <span>Référence : #{product.id}</span>
              </div>
            </div>
          </div>

          <Separator />

          <Button
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={!isInStock}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isInStock ? 'Ajouter au panier' : 'Indisponible'}
          </Button>

          {!isInStock && (
            <p className="text-sm text-destructive">
              Ce produit n'est malheureusement plus disponible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}