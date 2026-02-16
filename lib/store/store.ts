import { configureStore, createListenerMiddleware, isAction, Middleware } from '@reduxjs/toolkit';
import { productsApi } from '@/lib/api/productsApi'; 
import filterReducer from '@/lib/store/categoryFilter';
import cartReducer, { syncCart } from '@/lib/store/features/cartSlice';
import authReducer from '@/lib/store/features/authSlice';

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  if (isAction(action) && action.type.startsWith('cart/')) {
    const state = store.getState() as RootState;
    localStorage.setItem('cart', JSON.stringify(state.cart.items));
  }
  return result;
};

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return (
      isAction(action) && 
      action.type.startsWith('cart/') &&
      !action.type.includes('syncCart') && 
      !action.type.includes('fetchCart')
    );
  },
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    await listenerApi.delay(1000);

    const state = listenerApi.getState() as RootState;
    
    if (state.auth.user && state.auth.user.uid) {
      // @ts-ignore
      listenerApi.dispatch(syncCart({ 
        uid: state.auth.user.uid, 
        items: state.cart.items 
      }));
    }
  },
});

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
        .concat(localStorageMiddleware)
        .concat(listenerMiddleware.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];