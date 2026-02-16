'use client';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store/store';
import { initializeCart } from '@/lib/store/features/cartSlice';
import { initializeAuth } from '@/lib/store/features/authSlice'; // Імпорт

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      store.dispatch(initializeCart(JSON.parse(savedCart)));
    }

    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      store.dispatch(initializeAuth(JSON.parse(savedUser)));
    }
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}