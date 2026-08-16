'use client';

import { OrderDetail as OrderDetailType, PaymentMethod } from '@/types/order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { OrderLineItem } from './OrderLineItem';
import { CheckCircle2, Package, CreditCard, User } from 'lucide-react';

interface OrderDetailProps {
  order: OrderDetailType;
  lines: { id: number; productId: number; quantity: number }[];
}

const paymentMethodLabels: Record<PaymentMethod, string> = {
  [PaymentMethod.PAYPAL]: 'PayPal',
  [PaymentMethod.CREDIT_CARD]: 'Carte de crédit',
  [PaymentMethod.VISA]: 'Visa',
  [PaymentMethod.MASTER_CARD]: 'MasterCard',
  [PaymentMethod.BITCOIN]: 'Bitcoin',
};

export function OrderDetail({ order, lines }: OrderDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">Commande #{order.id}</h1>
        <Badge className="bg-green-500 text-white">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Confirmée
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Détails de la commande
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Référence</span>
              <span className="font-medium">{order.reference}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Montant total</span>
              <span className="font-bold">{order.amount.toFixed(2)} €</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mode de paiement</span>
              <span>{paymentMethodLabels[order.paymentMethod]}</span>
            </div>
            {order.createdDate && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date de commande</span>
                  <span>{new Date(order.createdDate).toLocaleDateString('fr-FR')}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Client
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">Client #{order.customerId}</p>
            <p className="text-sm text-muted-foreground">
              ID client: {order.customerId}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Produits commandés
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lines.length === 0 ? (
            <p className="text-muted-foreground">Aucun produit dans cette commande.</p>
          ) : (
            <div>
              {lines.map((line) => (
                <OrderLineItem key={line.id} line={line} />
              ))}
              <div className="mt-4 flex justify-between border-t pt-4 font-bold">
                <span>Total</span>
                <span>{order.amount.toFixed(2)} €</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Un email de confirmation a été envoyé à votre adresse email.</p>
        <p className="mt-1">Merci pour votre commande !</p>
      </div>
    </div>
  );
}