import React from 'react';
import { MenuItem } from './MenuItem';

export function BestSellers({ items, onAddToCart}) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Más Vendidos</h2>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-72 first:ml-0">
            <MenuItem 
              {...item} 
              onAdd={onAddToCart}
              showBestSellerBadge={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

