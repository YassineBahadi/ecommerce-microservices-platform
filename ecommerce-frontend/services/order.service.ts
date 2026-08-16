import { OrderRequest, OrderResponse, OrderLineResponse } from '@/types/order';
import { OrderDetail, OrderLineDetail } from '@/types/order';
export async function createOrder(data: OrderRequest): Promise<number> {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la création de la commande');
  }

  return response.json();
}

export async function getOrderById(id: number): Promise<OrderDetail> {
  const response = await fetch(`/api/orders/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la récupération de la commande');
  }

  return response.json();
}

export async function getOrderLines(orderId: number): Promise<OrderLineDetail[]> {
  const response = await fetch(`/api/order-lines/order/${orderId}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la récupération des lignes de commande');
  }

  return response.json();
}

