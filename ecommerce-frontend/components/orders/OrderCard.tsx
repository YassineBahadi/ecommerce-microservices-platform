'use client';

import { OrderResponse, PaymentMethod } from '@/types/order';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, CreditCard, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface OrderCardProps {
  order: OrderResponse;
}

const paymentMethodLabels: Record<PaymentMethod, string> = {
  [PaymentMethod.PAYPAL]: 'PayPal',
  [PaymentMethod.CREDIT_CARD]: 'Carte de crédit',
  [PaymentMethod.VISA]: 'Visa',
  [PaymentMethod.MASTER_CARD]: 'MasterCard',
  [PaymentMethod.BITCOIN]: 'Bitcoin',
};

export function OrderCard({ order }: OrderCardProps) {
  // Simuler une date de création (à remplacer par une vraie date si disponible)
  const createdDate = new Date();
  createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">
          Commande #{order.id}
        </CardTitle>
        <Badge variant="default" className="bg-green-500 text-white">
          Confirmée
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{createdDate.toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            <span>{paymentMethodLabels[order.paymentMethod]}</span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {order.reference || `ORD-${order.id}`}
            </span>
          </div>
          <span className="text-xl font-bold">
            {order.amount.toFixed(2)} €
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/orders/${order.id}`}>
            Voir les détails
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}