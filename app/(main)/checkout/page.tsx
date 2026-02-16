'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { useAuthGuard } from '@/hooks/useAuth'; 
import { clearCart } from '@/lib/store/features/cartSlice';

import Loader from '@/components/ui/Loader';
import EmptyCart from '@/components/checkout/EmptyCart';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import CheckoutForm, { CheckoutFormData } from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  const { isAuthenticated, requireAuth } = useAuthGuard();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, totalAmount } = useAppSelector((state) => state.cart);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    requireAuth('🔒 Спочатку увійдіть в акаунт, щоб оформити замовлення');
  }, [requireAuth]);

  const handleFinalSubmit = async (formData: CheckoutFormData) => {
    if (!formData.name || !formData.email || !formData.address) {
      toast.error('❌ Заповніть всі поля!');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      dispatch(clearCart());
      
      toast.success('🚀 Замовлення успішно оформлено! Дякуємо.', {
        position: "top-center",
        autoClose: 3000,
        theme: "colored"
      });
      
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (error) {
        console.error(error);
      toast.error('Сталася помилка при замовленні');
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center">
        <Loader centered label="Перевірка авторизації..." />
      </div>
    );
  }

  if (items.length === 0 && !isSubmitting) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto p-4 max-w-xl min-h-screen py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Оформлення</h1>
      
      <div className="card bg-white shadow-xl border border-gray-100">
        <div className="card-body">
          <CheckoutSummary totalAmount={totalAmount} itemCount={items.length} />
          
          <CheckoutForm 
            isSubmitting={isSubmitting} 
            onSubmit={handleFinalSubmit} 
          />
        </div>
      </div>
    </div>
  );
}