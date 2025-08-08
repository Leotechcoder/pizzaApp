import React, { useState, useEffect } from 'react';
import ProductModal  from './ProductModal.jsx';

// Hook para detectar pantalla
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query, matches]);

  return matches;
}

export default function ResponsiveMenuItem({
  id,
  name,
  description,
  price,
  image,
  category,
  ingredients,
  calories,
  preparationTime,
  volume,
  onAdd,
  isFavorite,
  onToggleFavorite,
  showBestSellerBadge = false,
  currency = "$",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleAddToCart = (product) => {
    onAdd(product);
    setIsModalOpen(false);
  };

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  if (!isDesktop) {
    // Versión para móviles (basado en NewMenuItems)
    return (
      <>
        <div
          className="flex items-center py-1 px-4 bg-white border border-gray-100 rounded-xl shadow-md"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex-1 py-2 pr-1">
            <h3 className="font-semibold font-sans text-gray-900 text-lg mt-2">{name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed pr-1">{description}</p>
            <span className="text-orange-500 font-semibold text-md">
              {currency} {formattedPrice}
            </span>
          </div>
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center text-gray-400 italic text-xs">
                Sin imagen
              </div>
            )}
          </div>
        </div>

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={{
            id,
            name,
            description,
            price,
            image,
            category,
            ingredients,
            calories,
            preparationTime,
            volume,
          }}
          onAddToCart={handleAddToCart}
        />
      </>
    );
  }

  // Versión para desktop (basado en MenuItem)
  return (
    <>
      <div
        className="group flex flex-col bg-white rounded-3xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative w-full h-40 md:h-42 lg:h-48 bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
              Sin imagen
            </div>
          )}
          {showBestSellerBadge && (
            <div className="absolute top-2 left-2 bg-red-700 text-white text-sm px-2 py-1 rounded">
              Más Vendido
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-xl mb-1 text-gray-900 leading-tight">
            {name}
          </h3>
          <p className="text-gray-500 text-sm mb-2">{category}</p>
          <p className="text-gray-600 text-sm mb-2 flex-grow line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-green-600 font-bold text-xl">
              {price ? `${currency}${formattedPrice}` : 'Consultar'}
            </span>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{
          id,
          name,
          description,
          price,
          image,
          category,
          ingredients,
          calories,
          preparationTime,
          volume,
        }}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
