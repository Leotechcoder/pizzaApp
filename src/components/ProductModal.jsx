import React from 'react';
import { X } from 'lucide-react';

function ProductDetailModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  // Cálculo de precios de pizza por tamaño
  const getPizzaPriceBySize = (basePrice, size) => {
    if (!basePrice) return 'Consultar precio';
    switch (size) {
      case 'Chica':
        return (basePrice * 0.8).toFixed(0);
      case 'Mediana':
        return basePrice.toFixed(0);
      case 'Grande':
        return (basePrice * 1.2).toFixed(0);
      default:
        return basePrice.toFixed(0);
    }
  };

  // Cálculo de precios para empanadas según docena
  const getEmpanadaPrices = (dozenPrice) => {
    const unit = dozenPrice / 12;
    return {
      unit: Math.round(unit),
      x4: Math.round(unit * 4),
      x6: Math.round(unit * 6),
      x8: Math.round(unit * 8),
      dozen: dozenPrice
    };
  };

  const isPizza =
    product.category === 'Pizza' || product.category === 'Pizza Rellena';
  const isEmpanada = product.category === 'Empanada';

  const empanadaPrices = isEmpanada && product.price
    ? getEmpanadaPrices(product.price)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-lg p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-2 text-center">{product.name}</h2>
        <p className="text-gray-700 mb-4 text-center">{product.category}</p>

        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2 text-lg">Ingredientes:</h3>
          {product.ingredients && product.ingredients.length > 0 ? (
            <p className="text-base text-gray-800">
              {product.ingredients.join(', ')}
            </p>
          ) : (
            <p className="text-base text-gray-800">
              Ingredientes no especificados.
            </p>
          )}
        </div>

        {isPizza && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-lg">
              Tamaños y Precios (Aprox.):
            </h3>
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
        )}

        {isEmpanada && empanadaPrices && (
          <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-lg">
              Precios por Cantidad (Aprox.):
            </h3>
            <ul className="list-disc list-inside text-gray-800">
              <li>1 unidad: ${empanadaPrices.unit}</li>
              <li>4 unidades: ${empanadaPrices.x4}</li>
              <li>6 unidades: ${empanadaPrices.x6}</li>
              <li>8 unidades: ${empanadaPrices.x8}</li>
              <li>12 unidades: ${empanadaPrices.dozen}</li>
            </ul>
          </div>
        )}

        {!isPizza && !isEmpanada && (
          <div className="mb-4 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-lg">Precio:</h3>
            <p className="text-2xl font-bold text-green-700">
              {product.price
                ? `$${product.price.toLocaleString('es-AR')}`
                : 'Consultar precio'}
            </p>
          </div>
        )}

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
