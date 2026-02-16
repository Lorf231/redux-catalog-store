import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, Category, GetProductsArgs } from '@/types/product'; 

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], GetProductsArgs>({
      query: ({ offset, limit, title, price_min, price_max, categoryId }) => {
        let params = `products?offset=${offset}&limit=${limit}`;
        
        if (title) params += `&title=${title}`;
        if (price_min) params += `&price_min=${price_min}`;
        if (price_max) params += `&price_max=${price_max}`;
        if (categoryId) params += `&categoryId=${categoryId}`;

        return params;
      },
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetCategoriesQuery, 
  useGetProductByIdQuery 
} = productsApi;