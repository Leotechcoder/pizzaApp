import React from 'react';
import { ShoppingCart } from 'lucide-react';

export function FloatingCartButton({ itemCount, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-orange-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {itemCount}
        </span>
      )}
    </button>
  );
}

