'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { removeFromCart, changeQuantity, clearCart } from '@/lib/store/features/cartSlice';

export default function CartPage() {
  const { items, totalAmount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Ваш кошик порожній</h2>
        <Link href="/" className="btn btn-primary">Повернутися до покупок</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Кошик</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="flex-grow overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Товар</th>
                <th>Ціна</th>
                <th>Кількість</th>
                <th>Сума</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 relative">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold line-clamp-1 max-w-[200px]">{item.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <div className="join border border-base-300">
                      <button 
                        className="join-item btn btn-xs" 
                        onClick={() => dispatch(changeQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      >
                        -
                      </button>
                      <span className="join-item px-2 flex items-center bg-base-100 text-sm">
                        {item.quantity}
                      </span>
                      <button 
                        className="join-item btn btn-xs"
                        onClick={() => dispatch(changeQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="font-bold">${item.price * item.quantity}</td>
                  <td>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="btn btn-ghost btn-xs text-error"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <button onClick={() => dispatch(clearCart())} className="btn btn-outline btn-error btn-sm mt-4">
             Очистити кошик
          </button>
        </div>

        <div className="w-full lg:w-80 h-fit card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title justify-between">
              Всього: 
              <span className="text-primary">${totalAmount}</span>
            </h2>
            <div className="divider my-2"></div>
            <p className="text-sm text-gray-500 mb-4">Доставка та податки розраховуються при оформленні.</p>
            <div className="card-actions flex-col gap-2">
              <Link href="/checkout" className="btn btn-primary w-full">
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