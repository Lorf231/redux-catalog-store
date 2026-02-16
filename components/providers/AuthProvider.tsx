'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setUser } from '@/lib/store/features/authSlice';
import { fetchCart, clearCart } from '@/lib/store/features/cartSlice';
import { mapUser } from '@/lib/api/authApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("🔥 AuthProvider: Start Listening"); 

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ AuthProvider: User Found ->", user.email);
        
        const serializedUser = mapUser(user);
        
        dispatch(setUser(serializedUser));
        
        dispatch(fetchCart(user.uid));
      } else {
        console.log("zzz AuthProvider: No User (Guest)"); 
        dispatch(setUser(null));
        dispatch(clearCart());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}