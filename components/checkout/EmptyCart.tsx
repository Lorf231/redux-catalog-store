'use client';

import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Кошик порожній 🛒</h2>
      <p className="text-gray-500 mb-6">Ви ще нічого не додали.</p>
      <Link href="/" className="btn btn-primary">
        В каталог
      </Link>
    </div>
  );
}