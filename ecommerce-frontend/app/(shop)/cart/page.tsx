'use client';

import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CartItemRow } from '@/components/shop/CartItemRow';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
  if (!isAuthenticated) {
    router.push('/login?redirect=/checkout');
    return;
  }
  router.push('/checkout');
};
  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-semibold">Votre panier est vide</h2>
        <p className="mt-2 text-muted-foreground">
          Découvrez nos produits et trouvez ce qui vous plaît !
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Voir les produits</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Votre panier</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Liste des articles */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border">
            <div className="p-4">
              {items.map((item) => (
                <CartItemRow
                  key={item.productId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
            <div className="border-t p-4">
              <Button variant="outline" onClick={clearCart}>
                Vider le panier
              </Button>
            </div>
          </div>
        </div>

        {/* Résumé */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Résumé de la commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Articles ({totalItems})</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Frais de livraison</span>
                <span>Calculé à l'étape suivante</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCheckout}>
  Passer la commande
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}