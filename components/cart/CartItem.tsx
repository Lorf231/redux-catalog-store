'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { removeFromCart, updateQuantity } from '@/lib/store/features/cartSlice';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const cleanImageUrl = (url: string) => {
    if (!url || !url.startsWith('http')) return 'https://placehold.co/100';
    return url.replace(/["[\]]/g, '');
  };

  return (
    <tr className="border-b-gray-50 hover:bg-gray-50 transition-colors">
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
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="join-item px-4 flex items-center bg-white text-sm font-medium w-10 justify-center">
              {item.quantity}
            </span>
            <button 
              className="join-item btn btn-sm btn-ghost px-2"
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
  );
}