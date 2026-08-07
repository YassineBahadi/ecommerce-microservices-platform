import { apiClient } from './api-client';
import { Product, ProductRequest, ProductPurchaseRequest, ProductPurchaseResponse } from '@/types/product';

export const productService = {
  // Récupérer tous les produits
  async getAllProducts(): Promise<Product[]> {
    const response = await apiClient.get('/api/v1/products');
    return response.data;
  },

  // Récupérer un produit par ID
  async getProductById(id: number): Promise<Product> {
    const response = await apiClient.get(`/api/v1/products/${id}`);
    return response.data;
  },

  // Créer un produit
  async createProduct(product: ProductRequest): Promise<number> {
    const response = await apiClient.post('/api/v1/products', product);
    return response.data;
  },

  // Acheter des produits
  async purchaseProducts(products: ProductPurchaseRequest[]): Promise<ProductPurchaseResponse[]> {
    const response = await apiClient.post('/api/v1/products/purchase', products);
    return response.data;
  },
};