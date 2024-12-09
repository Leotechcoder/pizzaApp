import React from 'react';
import { MenuItem } from './MenuItem';

export function BestSellers({ items, onAddToCart }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-64">
            <MenuItem {...item} onAdd={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}

