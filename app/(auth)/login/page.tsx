'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { loginUser } from '@/lib/store/features/authSlice';
import AuthCard from '@/components/auth/AuthCard';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthFooter from '@/components/auth/AuthFooter';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      toast.success('Успішний вхід!');
      router.push('/');
    } catch (error: any) {
      toast.error(error || 'Помилка входу');
    }
  };

  return (
    <AuthCard title="Вхід" subtitle="Ласкаво просимо назад!">
      <form onSubmit={handleSubmit}>
        <AuthInput 
          label="Email" 
          type="email" 
          placeholder="email@example.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <AuthInput 
          label="Пароль" 
          type="password" 
          placeholder="••••••••"
          required
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <AuthButton isLoading={isLoading} text="Увійти" />
      </form>
      <AuthFooter 
        text="Немає акаунту?" 
        linkText="Зареєструватися" 
        href="/register" 
      />
    </AuthCard>
  );
}