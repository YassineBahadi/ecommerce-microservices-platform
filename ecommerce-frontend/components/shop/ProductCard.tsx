'use client';

import { Product } from '@/types/product';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (product.availableQuantity <= 0) {
      toast.error('Stock épuisé', {
        description: 'Ce produit n’est plus disponible.',
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
    <Card className="h-full flex flex-col">
      <Link href={`/products/${product.id}`}>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>

          <Badge
            variant={
              product.availableQuantity > 0
                ? 'default'
                : 'destructive'
            }
          >
            {product.availableQuantity > 0
              ? `${product.availableQuantity} en stock`
              : 'Rupture'}
          </Badge>
        </CardHeader>

        <CardContent className="flex-1">
          <p className="text-muted-foreground">
            {product.description}
          </p>

          <p className="mt-4 text-xl font-bold">
            {product.price.toFixed(2)} €
          </p>
        </CardContent>
      </Link>

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