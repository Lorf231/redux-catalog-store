'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { loginUser } from '@/lib/store/features/authSlice'; 
import Loader from '@/components/ui/Loader'; 

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { isLoading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      await dispatch(loginUser({ 
        email: formData.email, 
        password: formData.password 
      })).unwrap();

      toast.success('Вітаємо! Ви успішно увійшли.');
      router.push('/');
      
    } catch (error: any) {
      console.error(error);
      toast.error(error || 'Помилка входу. Перевірте дані.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="card w-full max-w-md bg-white shadow-xl border border-gray-100">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold text-gray-800 mb-2">Вхід</h2>
          <p className="text-center text-gray-500 mb-6 text-sm">Введіть свої дані для доступу</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Email</span></label>
              <input 
                type="email" 
                className="input input-bordered bg-gray-50 focus:bg-white" 
                placeholder="name@example.com" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Пароль</span></label>
              <input 
                type="password" 
                className="input input-bordered bg-gray-50 focus:bg-white" 
                placeholder="••••••••" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary mt-4 w-full" 
              disabled={isLoading}
            >
              {isLoading ? <Loader size="sm" variant="spinner" className="text-white" /> : 'Увійти'}
            </button>
          </form>

          <div className="divider text-xs text-gray-400 mt-6">АБО</div>
          
          <p className="text-center text-sm text-gray-600">
            Немає акаунту?{' '}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Зареєструватися
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}