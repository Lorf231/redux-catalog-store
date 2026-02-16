import { configureStore, Middleware, isAction } from '@reduxjs/toolkit';
import { productsApi } from '@/lib/api/productsApi'; 
import filterReducer from '@/lib/store/categoryFilter';
import cartReducer from '@/lib/store/features/cartSlice';
import authReducer from '@/lib/store/features/authSlice';
import { CartState } from '@/types/cart'; 

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (isAction(action) && action.type.startsWith('cart/')) {
    
    const state = store.getState() as { cart: CartState };
    
    localStorage.setItem('cart', JSON.stringify(state.cart.items));
  }

  return result;
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
      filter: filterReducer,
      cart: cartReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(productsApi.middleware)
        .concat(localStorageMiddleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];