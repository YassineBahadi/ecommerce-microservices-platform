'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateCustomer } from '@/hooks/useCreateCustomer';
import { useCreateOrder } from '@/hooks/useCreateOrder';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PaymentMethod } from '@/types/order';
import { Loader2 } from 'lucide-react';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Le prénom est requis'),
  lastName: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  street: z.string().min(2, 'La rue est requise'),
  houseNumber: z.string().min(1, 'Le numéro est requis'),
  zipCode: z.string().min(4, 'Le code postal est requis'),
  paymentMethod: z.enum([
    PaymentMethod.PAYPAL,
    PaymentMethod.CREDIT_CARD,
    PaymentMethod.VISA,
    PaymentMethod.MASTER_CARD,
    PaymentMethod.BITCOIN,
  ]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { mutate: createCustomer, isPending: isCustomerPending } = useCreateCustomer();
  const { mutate: createOrder, isPending: isOrderPending } = useCreateOrder();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: PaymentMethod.PAYPAL,
    },
  });

  const isPending = isCustomerPending || isOrderPending;

  const onSubmit = (data: CheckoutFormValues) => {
    if (items.length === 0) {
      toast.error('Panier vide', {
        description: 'Ajoutez des produits avant de passer commande.',
      });
      return;
    }

    // Étape 1 : Créer le client
    createCustomer(
      {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        address: {
          street: data.street,
          houseNumber: data.houseNumber,
          zipCode: data.zipCode,
        },
      },
      {
        onSuccess: (customerResponse) => {
          const customerId = customerResponse.id;

          // Étape 2 : Créer la commande
          const orderData = {
            amount: getTotalPrice(),
            paymentMethod: data.paymentMethod,
            customerId: customerId,
            products: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          };

          createOrder(orderData, {
            onSuccess: (orderId) => {
              toast.success('Commande créée !', {
                description: `Votre commande #${orderId} a été enregistrée.`,
              });
              clearCart();
              router.push(`/orders/${orderId}`);
            },
            onError: (error) => {
              toast.error('Erreur lors de la création de la commande', {
                description: error.message,
              });
            },
          });
        },
        onError: (error) => {
          toast.error('Erreur lors de la création du client', {
            description: error.message,
          });
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Jean" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="jean.dupont@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Rue</FormLabel>
                <FormControl>
                  <Input placeholder="12 rue de Paris" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="houseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro</FormLabel>
                <FormControl>
                  <Input placeholder="12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code postal</FormLabel>
              <FormControl>
                <Input placeholder="75001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mode de paiement</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisissez un mode de paiement" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={PaymentMethod.PAYPAL}>PayPal</SelectItem>
                  <SelectItem value={PaymentMethod.CREDIT_CARD}>Carte de crédit</SelectItem>
                  <SelectItem value={PaymentMethod.VISA}>Visa</SelectItem>
                  <SelectItem value={PaymentMethod.MASTER_CARD}>MasterCard</SelectItem>
                  <SelectItem value={PaymentMethod.BITCOIN}>Bitcoin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement en cours...
            </>
          ) : (
            `Passer la commande (${getTotalPrice().toFixed(2)} €)`
          )}
        </Button>
      </form>
    </Form>
  );
}