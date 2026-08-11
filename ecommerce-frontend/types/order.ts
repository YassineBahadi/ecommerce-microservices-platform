export enum PaymentMethod {
  PAYPAL = 'PAYPAL',
  CREDIT_CARD = 'CREDIT_CARD',
  VISA = 'VISA',
  MASTER_CARD = 'MASTER_CARD',
  BITCOIN = 'BITCOIN',
}

export interface OrderRequest {
  id?: number;
  reference?: string;
  amount: number;
  paymentMethod: PaymentMethod;
  customerId: string;
  products: ProductPurchaseRequest[];
}

export interface ProductPurchaseRequest {
  productId: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  reference: string;
  amount: number;
  paymentMethod: PaymentMethod;
  customerId: string;
}

export interface OrderLineResponse {
  id: number;
  quantity: number;
}