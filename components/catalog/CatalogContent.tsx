'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetProductsQuery } from '@/lib/api/productsApi';
import { useDebounce } from '@/hooks/useDebounce';

import Sidebar from '@/components/catalog/Sidebar';
import ProductList from '@/components/catalog/ProductList';
import Pagination from '@/components/catalog/Pagination';
import Loader from '@/components/ui/Loader';

const ITEMS_PER_PAGE = 9;

export default function CatalogContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { searchTerm, categoryId, minPrice, maxPrice } = useAppSelector((state) => state.filter);
  
  const debouncedSearch = useDebounce(searchTerm, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const currentPage = Number(searchParams.get('page')) || 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data: products, isLoading, isError, isFetching } = useGetProductsQuery({
    offset,
    limit: ITEMS_PER_PAGE,
    title: debouncedSearch,
    price_min: debouncedMinPrice,
    price_max: debouncedMaxPrice,
    categoryId: categoryId,
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage !== 1) {
       params.set('page', '1');
       router.push(`${pathname}?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, categoryId, debouncedMinPrice, debouncedMaxPrice]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
        <Sidebar />
        
        <main className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <span className="text-gray-600 text-sm">
               {isFetching ? 'Оновлення списку...' : `Знайдено товарів: ${products?.length || 0}`}
            </span>
          </div>

          {isLoading && <Loader centered variant="dots" />}

          {isError && (
             <div className="alert alert-error shadow-lg">
               <span>Помилка завантаження даних. Перевірте з'єднання.</span>
             </div>
          )}

          {!isLoading && !isError && products && products.length > 0 && (
             <ProductList products={products} />
          )}

          {!isLoading && !isError && products?.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <h3 className="text-lg font-medium text-gray-600">Нічого не знайдено 🔍</h3>
              <p className="text-gray-400 mt-2">Спробуйте змінити параметри фільтрації</p>
            </div>
          )}

          {(!isLoading && (products?.length !== 0 || currentPage > 1)) && (
            <Pagination 
              currentPage={currentPage} 
              onPageChange={handlePageChange}
              hasMore={products ? products.length >= ITEMS_PER_PAGE : false}
              isFetching={isFetching}
            />
          )}
        </main>
    </div>
  );
}