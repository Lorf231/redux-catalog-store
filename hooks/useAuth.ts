'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppSelector } from './reduxHooks';

export function useAuthGuard() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const isAuthenticated = !!user; 

  const requireAuth = (message = 'Ця дія потребує авторизації') => {
    if (isLoading) return false; 
    
    if (!isAuthenticated) {
      toast.info(message);
      router.push('/login');
      return false;
    }
    return true;
  };

  return { 
    user, 
    isAuthenticated, 
    isLoading, 
    requireAuth 
  };
}