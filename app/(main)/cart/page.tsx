'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { removeFromCart, updateQuantity, clearCart } from '@/lib/store/features/cartSlice';

export default function CartPage() {
  const { items, totalAmount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const cleanImageUrl = (url: string) => {
    if (!url || !url.startsWith('http')) return 'https://placehold.co/100';
    return url.replace(/["[\]]/g, '');
  };

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
        
        <div className="flex-grow overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          <table className="table w-full">
            <thead>
              <tr className="border-b-gray-100">
                <th className="bg-white">Товар</th>
                <th className="bg-white">Ціна</th>
                <th className="bg-white text-center">Кількість</th>
                <th className="bg-white">Сума</th>
                <th className="bg-white"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b-gray-50 hover:bg-gray-50 transition-colors">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-100 bg-white">
                          <Image 
                            src={cleanImageUrl(item.image)} 
                            alt={item.title} 
                            fill 
                            className="object-contain p-1" 
                          />
                        </div>
                      </div>
                      <div>
                        <Link href={`/products/${item.id}`} className="font-bold line-clamp-2 max-w-[200px] hover:text-primary transition-colors">
                          {item.title}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">${item.price}</td>
                  <td>
                    <div className="flex justify-center">
                      <div className="join border border-gray-200 rounded-lg">
                        <button 
                          className="join-item btn btn-sm btn-ghost px-2" 
                          // 👇 ВИПРАВЛЕНО: updateQuantity
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          disabled={item.quantity <= 1} // Блокуємо мінус, якщо 1 шт
                        >
                          -
                        </button>
                        <span className="join-item px-4 flex items-center bg-white text-sm font-medium w-10 justify-center">
                          {item.quantity}
                        </span>
                        <button 
                          className="join-item btn btn-sm btn-ghost px-2"
                          // 👇 ВИПРАВЛЕНО: updateQuantity
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <th>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="btn btn-ghost btn-xs text-gray-400 hover:text-red-500"
                      title="Видалити"
                    >
                      ✕
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="p-4 flex justify-between items-center">
             <button 
               onClick={() => dispatch(clearCart())} 
               className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50"
             >
               🗑️ Очистити кошик
             </button>
          </div>
        </div>

        {/* Сайдбар з підсумком */}
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

      </div>
    </div>
  );
}