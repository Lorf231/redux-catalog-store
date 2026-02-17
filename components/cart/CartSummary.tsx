'use client';

import Link from 'next/link';

interface CartSummaryProps {
  totalAmount: number;
}

export default function CartSummary({ totalAmount }: CartSummaryProps) {
  return (
    <div className="w-full lg:w-80 h-fit card bg-white shadow-xl border border-gray-100">
      <div className="card-body">
        <h2 className="card-title justify-between text-gray-800">
          Всього: 
          <span className="text-2xl text-primary font-bold">${totalAmount.toFixed(2)}</span>
        </h2>
        <div className="divider my-2"></div>
        <p className="text-sm text-gray-500 mb-4">Доставка та податки розраховуються при оформленні.</p>
        <div className="card-actions flex-col gap-3">
          <Link href="/checkout" className="btn btn-primary w-full text-white shadow-lg shadow-blue-500/30">
            Оформити замовлення
          </Link>
          <Link href="/" className="btn btn-ghost w-full">
            Продовжити покупки
          </Link>
        </div>
      </div>
    </div>
  );
}