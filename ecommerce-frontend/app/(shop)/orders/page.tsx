'use client';

import { useOrders } from '@/hooks/useOrders';
import { OrderList } from '@/components/orders/OrderList';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OrdersPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const { data: orders, isLoading: isOrdersLoading } = useOrders();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push('/login?redirect=/orders');
    }
  }, [isAuthenticated, isAuthLoading, router]);

  if (isAuthLoading || isOrdersLoading) {
    return (
      <div className="mx-auto max-w-3xl py-12">
        <h1 className="mb-8 text-3xl font-bold">Mes commandes</h1>
        <OrderList orders={[]} isLoading={true} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl py-8">
      <h1 className="mb-8 text-3xl font-bold">Mes commandes</h1>
      <OrderList orders={orders || []} isLoading={false} />
    </div>
  );
}