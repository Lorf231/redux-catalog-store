'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { registerUser } from '@/lib/store/features/authSlice'; 
import Loader from '@/components/ui/Loader';

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
      if (error.includes('email-already-in-use')) {
        toast.error('Цей email вже зареєстровано');
      } else {
        toast.error('Помилка реєстрації. Спробуйте пізніше.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="card w-full max-w-md bg-white shadow-xl border border-gray-100">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold text-gray-800 mb-2">Реєстрація</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Ім'я</span></label>
              <input 
                type="text" 
                className="input input-bordered" 
                placeholder="Іван" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Email</span></label>
              <input 
                type="email" 
                className="input input-bordered" 
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
                className="input input-bordered" 
                placeholder="••••••••" 
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Підтвердження паролю</span></label>
              <input 
                type="password" 
                className="input input-bordered" 
                placeholder="••••••••" 
                required
                minLength={6}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary mt-4 w-full" 
              disabled={isLoading}
            >
               {isLoading ? <Loader size="sm" variant="spinner" className="text-white" /> : 'Створити акаунт'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Вже є акаунт?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Увійти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}