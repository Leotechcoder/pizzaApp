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
            className="  w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {showBestSellerBadge && (
            <div className="absolute top-2 left-2 bg-red-700 text-white text-sm px-2 py-1 rounded">
              Más Vendido
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          {/* Título principal del producto */}
          <h3 className="font-bold text-xl mb-1 text-gray-900 leading-tight">
            {name}
          </h3>

          {/* Categoría del producto, debajo del nombre y más sutil */}
          <p className="text-gray-500 text-sm mb-2">
            {category === 'Pizza Rellena' ? 'Pizza Rellena' : category}
            {/* La lógica para pluralizar/singularizar categorías se maneja mejor en el componente padre (MenuPage)
                o en una función auxiliar si es necesario para los títulos de sección.
                Aquí, simplemente mostramos la categoría tal cual, que ya es comprensible. */}
          </p>

          {/* Descripción del producto, con límite de 2 líneas para mantener la uniformidad en las tarjetas */}
          <p className="text-gray-600 text-sm mb-2 flex-grow line-clamp-2">
            {description}
          </p>

          {/* Contenedor para el precio, alineado a la izquierda */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-green-600 font-bold text-xl">
              {/* Formatea el precio para que sea legible, o muestra 'Consultar' si no hay precio */}
              {price ? `$${price.toLocaleString('es-AR')}` : 'Consultar'}
            </span>
            {/* El botón "Ver Detalles" (o similar) se manejaría en el componente padre de la tarjeta (MenuPage),
                ya que es el que abre el modal. */}
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

