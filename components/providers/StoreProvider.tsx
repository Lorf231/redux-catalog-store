'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/store/store';
import { initializeCart } from '@/lib/store/features/cartSlice';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current) {
      const savedCart = localStorage.getItem('cart');
      
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          storeRef.current.dispatch(initializeCart(parsedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}