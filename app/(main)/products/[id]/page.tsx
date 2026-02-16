'use client';

import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { useGetProductByIdQuery } from '@/lib/api/productsApi';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { addToCart } from '@/lib/store/features/cartSlice';
import { useAuthGuard } from '@/hooks/useAuth';

import ProductImage from '@/components/catalog/Item/ItemImage';
import ProductInfo from '@/components/catalog/Item/ItemInfo';
import ProductActions from '@/components/catalog/Item/ItemActions';
import Loader from '@/components/ui/Loader';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { requireAuth } = useAuthGuard(); 

  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  const handleAddToCart = (quantity: number) => {
    if (!product) return;

    if (!requireAuth('🔒 Увійдіть, щоб купити цей товар')) return;

    const cleanImage = product.images[0]?.replace(/["[\]]/g, '') || '';

    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: cleanImage,
      quantity: quantity
    }));

    toast.success(`🛒 Додано ${quantity} шт. "${product.title}"!`, {
      position: "bottom-right",
      theme: "colored"
    });
  };

  if (isLoading) return <Loader centered className="min-h-[50vh]" />;
  
  if (isError || !product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="alert alert-error max-w-lg shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Товар не знайдено або сталася помилка :(</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-10 min-h-screen">
      <div className="card lg:card-side bg-white shadow-xl border border-gray-100 overflow-hidden">
        
        <ProductImage 
          image={product.images[0]} 
          title={product.title} 
          category={product.category.name} 
        />

        <div className="card-body lg:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <ProductInfo 
              title={product.title} 
              price={product.price} 
              description={product.description} 
            />
          </div>

          <ProductActions onAddToCart={handleAddToCart} />
        </div>

      </div>
    </div>
  );
}