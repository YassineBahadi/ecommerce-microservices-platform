import { apiClient } from './api-client';
import { Customer, CustomerRequest } from '@/types/customer';

export const customerService = {
  async createCustomer(customer: CustomerRequest): Promise<string> {
    const response = await apiClient.post('/api/v1/customers', customer);
    return response.data;
  },

  async getCustomerById(id: string): Promise<Customer> {
    const response = await apiClient.get(`/api/v1/customers/${id}`);
    return response.data;
  },

  async customerExists(id: string): Promise<boolean> {
    const response = await apiClient.get(`/api/v1/customers/exists/${id}`);
    return response.data;
  },
};