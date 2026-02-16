'use client';

import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store/store';
import { initializeCart } from '@/lib/store/features/cartSlice';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        store.dispatch(initializeCart(JSON.parse(savedCart)));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}