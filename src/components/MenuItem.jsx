import React, { useState } from 'react';
import { Plus, Clock, Flame, Heart } from 'lucide-react';
import  ProductModal  from './ProductModal';

export function MenuItem({ 
  id, 
  name, 
  price, 
  image, 
  description, 
  category, 
  ingredients, 
  calories, 
  preparationTime, 
  volume, 
  onAdd, 
  isFavorite, 
  onToggleFavorite,
  showBestSellerBadge = false,
  originalPrice // Add support for original price
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (product) => {
    onAdd(product);
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className="group flex flex-col bg-white rounded-3xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {showBestSellerBadge && (
            <div className="absolute top-2 left-2 bg-red-700 text-white text-sm px-2 py-1 rounded">
              Más Vendido
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className='flex justify-between items-center'>

          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(id);
            }}
            className={`p-2 rounded-full ${isFavorite ? 'text-red-600' : 'text-gray-400'}`}
          >
            <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          </div>
          <p className="text-gray-600 text-sm mb-2 flex-grow line-clamp-2">{description}</p>
          {/* <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
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
          </div> */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-semibold text-lg">${price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-gray-400 line-through text-sm">${originalPrice.toFixed(2)}</span>
              )}
            </div>
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button> */}
          </div>
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

