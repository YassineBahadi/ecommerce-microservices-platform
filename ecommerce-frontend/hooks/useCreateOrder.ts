import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/services/order.service';
import { OrderRequest } from '@/types/order';

export function useCreateOrder() {
  return useMutation({
    mutationFn: (data: OrderRequest) => createOrder(data),
  });
}