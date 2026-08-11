import { useMutation } from '@tanstack/react-query';
import { createCustomer } from '@/services/customer.service';
import { CustomerRequest } from '@/types/customer';

export function useCreateCustomer() {
  return useMutation({
    mutationFn: (data: CustomerRequest) => createCustomer(data),
  });
}