import { notFound } from 'next/navigation';
import { productService } from '@/services/product.service';
import { ProductDetail } from '@/components/shop/ProductDetail';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  try {
    const product = await productService.getProductById(id);

    return (
      <div className="max-w-4xl mx-auto">
        <ProductDetail product={product} />
      </div>
    );
  } catch {
    notFound();
  }
}