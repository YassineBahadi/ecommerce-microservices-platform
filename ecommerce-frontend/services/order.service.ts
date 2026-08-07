import { apiClient } from './api-client';
import { OrderRequest, OrderResponse, OrderLineResponse } from '@/types/order';

export const orderService = {
  async createOrder(order: OrderRequest): Promise<number> {
    const response = await apiClient.post('/api/v1/orders', order);
    return response.data;
  },

  async getAllOrders(): Promise<OrderResponse[]> {
    const response = await apiClient.get('/api/v1/orders');
    return response.data;
  },

  async getOrderById(id: number): Promise<OrderResponse> {
    const response = await apiClient.get(`/api/v1/orders/${id}`);
    return response.data;
  },

  async getOrderLines(orderId: number): Promise<OrderLineResponse[]> {
    const response = await apiClient.get(`/api/v1/order-lines/order/${orderId}`);
    return response.data;
  },
};