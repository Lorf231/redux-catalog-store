'use client';

import Link from 'next/link';
import { useAppSelector } from '@/hooks/reduxHooks';
import CartList from '@/components/cart/CartList';
import CartSummary from '@/components/cart/CartSummary';

export default function CartPage() {
  const { items, totalAmount } = useAppSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center py-20 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Ваш кошик порожній 🛒</h2>
        <p className="text-gray-500 mb-6">Але це легко виправити!</p>
        <Link href="/" className="btn btn-primary">Повернутися до покупок</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Кошик</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <CartList items={items} />
        <CartSummary totalAmount={totalAmount} />
      </div>
    </div>
  );
}