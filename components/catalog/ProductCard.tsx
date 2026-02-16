'use client';

import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { addToCart } from '@/lib/store/features/cartSlice';
import { useAuthGuard } from '@/hooks/useAuth';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { requireAuth } = useAuthGuard();

  const cleanImageUrl = (url: string) => {
    if (!url) return 'https://placehold.co/400?text=No+Image';
    const cleaned = url.replace(/^\["?|"?]$/g, '').replace(/"/g, '');
    if (!cleaned.startsWith('http')) return 'https://placehold.co/400?text=Invalid+Url';
    return cleaned;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!requireAuth('🔒 Увійдіть, щоб додати товар у кошик')) return;

    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: cleanImageUrl(product.images[0]),
      quantity: 1
    }));

    toast.success(`✅ "${product.title}" додано в кошик!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="card card-compact bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group overflow-hidden">
      <figure className="relative h-64 w-full bg-white flex items-center justify-center p-4">
        <Image
          src={cleanImageUrl(product.images[0])}
          alt={product.title}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 badge badge-ghost bg-white/90 backdrop-blur-sm text-xs font-medium border-gray-200">
          {product.category.name}
        </div>
      </figure>

      <div className="card-body border-t border-gray-50">
        <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
          <h2 className="text-base font-bold text-gray-800 line-clamp-1" title={product.title}>
            {product.title}
          </h2>
        </Link>

        <p className="text-xs text-gray-500 line-clamp-2 h-8">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="btn btn-sm btn-primary btn-outline hover:!text-white"
          >
            Купити
          </button>
        </div>
      </div>
    </div>
  );
}