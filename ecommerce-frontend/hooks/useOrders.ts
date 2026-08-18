import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '@/services/order.service';

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
}