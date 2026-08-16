import { useQuery } from '@tanstack/react-query';
import { getOrderById, getOrderLines } from '@/services/order.service';

export function useOrder(id: number) {
  const orderQuery = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderById(id),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const linesQuery = useQuery({
    queryKey: ['order-lines', id],
    queryFn: () => getOrderLines(id),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!id && !orderQuery.error,
  });

  return {
    order: orderQuery.data,
    lines: linesQuery.data,
    isLoading: orderQuery.isLoading || linesQuery.isLoading,
    error: orderQuery.error || linesQuery.error,
  };
}