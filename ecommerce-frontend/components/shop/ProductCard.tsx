'use client';

import { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <Link href={`/products/${product.id}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
            <Badge variant="secondary" className="shrink-0">
              {product.categoryName}
            </Badge>
          </div>
        </CardHeader>
      </Link>

      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold">
            {product.price.toFixed(2)} €
          </span>
          <Badge variant={product.availableQuantity > 0 ? 'default' : 'destructive'}>
            {product.availableQuantity > 0
              ? `${product.availableQuantity} en stock`
              : 'Rupture'}
          </Badge>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.availableQuantity <= 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  );
}