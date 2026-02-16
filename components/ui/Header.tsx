'use client';

import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { logout } from '@/lib/store/features/authSlice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Header() {
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);

  const cartState = useAppSelector((state) => state.cart);
  const items = cartState?.items || []; 
  
  const authState = useAppSelector((state) => state.auth);
  const user = authState?.user;
  const isAuthenticated = authState?.isAuthenticated;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.info('Ви вийшли з акаунту');
  };

  return (
    <div className="navbar bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 px-4 md:px-8 mb-6">
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold text-gray-800 tracking-tight hover:text-primary transition-colors">
          STORE<span className="text-primary">.APP</span>
        </Link>
      </div>
      
      <div className="flex-none gap-4 items-center">
        <Link href="/cart" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              width="24" 
              height="24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {mounted && totalItems > 0 && (
              <span className="badge badge-sm badge-primary indicator-item text-white">
                {totalItems}
              </span>
            )}
          </div>
        </Link>

        {mounted && isAuthenticated && user ? (
          <div className="dropdown dropdown-end">
             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder border border-gray-300">
              <div className="bg-neutral text-neutral-content rounded-full w-10 flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {user.name ? user.name.slice(0, 2).toUpperCase() : 'U'}
                </span>
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-gray-100">
              <li className="menu-title px-4 py-2 text-gray-500">Привіт, {user.name}</li>
              <div className="divider my-0"></div>
              <li><button onClick={handleLogout} className="text-red-500 hover:bg-red-50">Вийти</button></li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm text-white px-6">
            Увійти
          </Link>
        )}
      </div>
    </div>
  );
}