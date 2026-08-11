import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/product.service';
import { getProductById } from '@/services/product.service';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!id, // Ne s'exécute que si id est défini
  });
}