import { Product } from '@/types/product';

/**
 * Récupère la liste des produits depuis l'API Gateway
 * via l'endpoint Next.js /api/products
 */
export async function getProducts(): Promise<Product[]> {
  const response = await fetch('/api/products', {
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la récupération des produits');
  }

  return response.json();
}

/**
 * Récupère un produit par son ID
 */
export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`/api/products/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la récupération du produit');
  }

  return response.json();
}