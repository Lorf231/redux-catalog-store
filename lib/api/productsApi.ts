import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, Category } from '@/types/product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/' }),
  endpoints: (builder) => ({
    
    getProducts: builder.query<Product[], { 
      offset: number; 
      limit: number; 
      title?: string; 
      price_min?: number; 
      price_max?: number; 
      categoryId?: number | null;
    }>({
      query: (params) => {
        const searchParams = new URLSearchParams();

        searchParams.append('offset', params.offset.toString());
        searchParams.append('limit', params.limit.toString());

        if (params.title) {
          searchParams.append('title', params.title);
        }

        if (params.price_min !== undefined && params.price_min !== null) {
          searchParams.append('price_min', params.price_min.toString());
        }

        if (params.price_max !== undefined && params.price_max !== null) {
          searchParams.append('price_max', params.price_max.toString());
        }

        if (params.categoryId) {
          searchParams.append('categoryId', params.categoryId.toString());
        }

        return `products?${searchParams.toString()}`;
      },
    }),

    getCategories: builder.query<Category[], void>({
      query: () => 'categories',
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetCategoriesQuery, 
  useGetProductByIdQuery 
} = productsApi;