'use client';

import { useState } from 'react';

interface ProductActionsProps {
  onAddToCart: (quantity: number) => void;
}

export default function ProductActions({ onAddToCart }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity((prev) => prev + 1);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
      <div className="join border border-gray-300 rounded-lg bg-gray-50">
        <button 
          className="join-item btn btn-ghost px-4 hover:bg-gray-200" 
          onClick={handleDecrease}
        >
          -
        </button>
        <button className="join-item btn btn-ghost pointer-events-none w-12 font-bold text-lg">
          {quantity}
        </button>
        <button 
          className="join-item btn btn-ghost px-4 hover:bg-gray-200" 
          onClick={handleIncrease}
        >
          +
        </button>
      </div>

      <button 
        onClick={() => onAddToCart(quantity)}
        className="btn btn-primary flex-grow text-lg shadow-lg shadow-blue-500/30 text-white"
      >
        Додати в кошик
      </button>
    </div>
  );
}