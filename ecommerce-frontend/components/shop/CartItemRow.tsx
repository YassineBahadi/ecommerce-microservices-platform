'use client';

import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus } from 'lucide-react';

// On va définir le type ici directement pour éviter l'erreur
type CartItemType = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  availableQuantity: number;
};

interface CartItemRowProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-muted-foreground">
          {item.price.toFixed(2)} € / unité
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
          disabled={item.quantity >= item.availableQuantity}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="w-24 text-right font-medium">
        {(item.price * item.quantity).toFixed(2)} €
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(item.productId)}
        className="text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}