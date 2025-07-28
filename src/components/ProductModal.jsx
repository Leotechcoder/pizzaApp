import React from 'react';
import { X } from 'lucide-react';
import { useBackButton } from '../hooks/useBackButton'; // Assuming this hook exists and is correctly implemented

function ProductDetailModal({ isOpen, onClose, product }) {
  // useBackButton(isOpen, onClose); // Keep if you want back button to close modal

  if (!isOpen || !product) return null;

  // Function to calculate pizza prices based on size
  const getPizzaPriceBySize = (basePrice, size) => {
    if (!basePrice) return 'Consultar precio'; // Handle cases where basePrice is null
    switch (size) {
      case 'Chica':
        return (basePrice * 0.8).toFixed(0); // 80% of base price
      case 'Mediana':
        return basePrice.toFixed(0); // Base price
      case 'Grande':
        return (basePrice * 1.2).toFixed(0); // 120% of base price
      default:
        return basePrice.toFixed(0); // Fallback to base price
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-lg p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-4 text-center">{product.name}</h2>
        
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover rounded-lg mb-4" 
          />
        )}

        {/* <p className="text-gray-700 mb-4 text-center">{product.description}</p> */}

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2 text-lg">Ingredientes:</h3>
          {product.ingredients && product.ingredients.length > 0 ? (
            <p className="text-base text-gray-800">{product.ingredients.join(', ')}</p>
          ) : (
            <p className="text-base text-gray-800">Ingredientes no especificados.</p>
          )}
        </div>

        {product.category === 'Pizza' || product.category === 'Pizza Rellena' ? (
          <div className="mb-4 p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-lg">Tamaños y Precios (Aprox.):</h3>
            <ul className="list-disc list-inside text-gray-800">
              <li>Chica: ${getPizzaPriceBySize(product.price, 'Chica')}</li>
              <li>Mediana: ${getPizzaPriceBySize(product.price, 'Mediana')}</li>
              <li>Grande: ${getPizzaPriceBySize(product.price, 'Grande')}</li>
            </ul>
            {product.price === null && (
              <p className="text-sm text-gray-600 mt-2">
                *El precio base de este producto no está disponible.
              </p>
            )}
          </div>
        ) : (
          <div className="mb-4 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-lg">Precio:</h3>
            <p className="text-2xl font-bold text-green-700">
              {product.price ? `$${product.price.toLocaleString('es-AR')}` : 'Consultar precio'}
            </p>
          </div>
        )}

        {/* Removed quantity selector and "Add to cart" button */}
        {/* Removed customisation options like crust types, bun types, toppings */}

        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;