import { CustomerRequest, Customer } from '@/types/customer';

export async function createCustomer(data: CustomerRequest): Promise<{ id: string }> {
  const response = await fetch('/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la création du client');
  }

  return response.json();
}

export async function getCustomerById(id: string): Promise<Customer> {
  const response = await fetch(`/api/customers/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la récupération du client');
  }

  return response.json();
}