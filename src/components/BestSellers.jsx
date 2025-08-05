import React from 'react';
import { MenuItem } from './MenuItem';

export function BestSellers({ items, onAddToCart}) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4 mx-3 md:mx-1">
        <h2 className="text-2xl font-bold">Más Vendidos</h2>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide mx-2 p-2">
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-60 first:ml-0.5">
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

