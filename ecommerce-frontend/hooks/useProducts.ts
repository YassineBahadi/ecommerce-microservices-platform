import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/product.service';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });
}