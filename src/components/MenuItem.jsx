import React, { useState } from 'react';
import { Plus, Clock, Flame } from 'lucide-react';
import { ProductModal } from './ProductModal';

export function MenuItem({ id, name, price, image, description, category, ingredients, calories, preparationTime, volume, onAdd }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (product) => {
    onAdd(product);
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className="flex items-start justify-between p-4 bg-white rounded-xl shadow-sm cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-start gap-4">
          <img
            src={image}
            alt={name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-gray-600 text-sm mb-2">{description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {preparationTime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {preparationTime}
                </div>
              )}
              {calories && (
                <div className="flex items-center">
                  <Flame className="w-4 h-4 mr-1" />
                  {calories} cal
                </div>
              )}
              {volume && (
                <div>{volume}</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-green-500 font-semibold mb-2">${price}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{ id, name, price, image, description, category, ingredients, calories, preparationTime, volume }}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}

