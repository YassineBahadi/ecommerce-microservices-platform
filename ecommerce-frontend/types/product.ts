export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  availableQuantity: number;
  price: number;
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
}

export interface ProductRequest {
  id?: number;
  name: string;
  description: string;
  availableQuantity: number;
  price: number;
  categoryId: number;
}

export interface ProductPurchaseRequest {
  productId: number;
  quantity: number;
}

export interface ProductPurchaseResponse {
  productId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}