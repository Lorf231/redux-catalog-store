'use client';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { clearCart } from '@/lib/store/features/cartSlice';
import { CartItem as CartItemType } from '@/types/cart';
import CartItem from './CartItem';

interface CartListProps {
  items: CartItemType[];
}

export default function CartList({ items }: CartListProps) {
  const dispatch = useAppDispatch();

  return (
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
            <CartItem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
      
      <div className="p-4">
         <button 
           onClick={() => dispatch(clearCart())} 
           className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50"
         >
           🗑️ Очистити кошик
         </button>
      </div>
    </div>
  );
}