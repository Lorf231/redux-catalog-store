'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { registerUser } from '@/lib/store/features/authSlice';
import AuthCard from '@/components/auth/AuthCard';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthFooter from '@/components/auth/AuthFooter';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('❌ Паролі не співпадають!');
      return;
    }
    
    try {
      await dispatch(registerUser({ 
        email: formData.email, 
        password: formData.password,
        name: formData.name
      })).unwrap();

      toast.success('🎉 Акаунт успішно створено!');
      router.push('/');
      
    } catch (error: any) {
      console.error(error);
      toast.error(error || 'Помилка реєстрації. Спробуйте пізніше.');
    }
  };

  return (
    <AuthCard 
      title="Реєстрація" 
      subtitle="Створіть свій профіль, щоб почати купувати"
    >
      <form onSubmit={handleSubmit}>
        <AuthInput 
          label="Ім'я" 
          type="text" 
          placeholder="Ваше ім'я" 
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />

        <AuthInput 
          label="Email" 
          type="email" 
          placeholder="name@example.com" 
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />

        <AuthInput 
          label="Пароль" 
          type="password" 
          placeholder="••••••••" 
          required
          minLength={6}
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />

        <AuthInput 
          label="Підтвердження паролю" 
          type="password" 
          placeholder="••••••••" 
          required
          minLength={6}
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
        />

        <AuthButton 
          isLoading={isLoading} 
          text="Створити акаунт" 
        />
      </form>

      <AuthFooter 
        text="Вже є акаунт?" 
        linkText="Увійти" 
        href="/login" 
      />
    </AuthCard>
  );
}