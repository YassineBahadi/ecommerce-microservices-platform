'use client';

import { OrderLineDetail } from '@/types/order';

interface OrderLineItemProps {
  line: OrderLineDetail;
}

export function OrderLineItem({ line }: OrderLineItemProps) {
  return (
    <div className="flex items-center justify-between border-b py-3">
      <div>
        <p className="font-medium">Produit #{line.productId}</p>
        <p className="text-sm text-muted-foreground">Quantité: {line.quantity}</p>
      </div>
    </div>
  );
}