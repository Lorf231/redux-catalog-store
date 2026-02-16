'use client';

import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { logoutUser } from '@/lib/store/features/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.info('Ви вийшли з акаунту');
    router.push('/login');
  };

  return (
    <header className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 md:px-8">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl normal-case font-bold text-primary">
          NextStore 🛍️
        </Link>
      </div>

      <div className="flex-none gap-4">
        <Link href="/cart" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {items.length > 0 && (
              <span className="badge badge-sm indicator-item badge-primary text-white">
                {items.length}
              </span>
            )}
          </div>
        </Link>

        {isLoading ? (
          <span className="loading loading-spinner loading-sm text-primary"></span>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder border border-gray-200">
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                <span className="text-xl uppercase">{user.displayName ? user.displayName[0] : user.email?.[0] || 'U'}</span>
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="menu-title px-4 py-2 text-xs text-gray-500">
                {user.displayName || user.email}
              </li>
              <li><Link href="/profile">Мій профіль</Link></li>
              <li><Link href="/orders">Мої замовлення</Link></li>
              <div className="divider my-1"></div>
              <li><button onClick={handleLogout} className="text-error">Вийти</button></li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm text-white">
            Увійти
          </Link>
        )}
      </div>
    </header>
  );
}