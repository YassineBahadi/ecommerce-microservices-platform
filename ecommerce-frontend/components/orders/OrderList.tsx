'use client';

import { OrderResponse } from '@/types/order';
import { OrderCard } from './OrderCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface OrderListProps {
  orders: OrderResponse[];
  isLoading?: boolean;
}

export function OrderList({ orders, isLoading = false }: OrderListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3 rounded-lg border p-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="py-12 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-semibold">Aucune commande</h2>
        <p className="mt-2 text-muted-foreground">
          Vous n'avez pas encore passé de commande.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Commencer vos achats</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}