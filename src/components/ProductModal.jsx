import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { useBackButton } from '../hooks/useBackButton';

const sizes = ['Small', 'Medium', 'Large'];
const crustTypes = ['Thin', 'Regular', 'Thick'];
const bunTypes = ['Regular', 'Sesame', 'Brioche'];
const pastaTypes = ['Regular', 'Whole Wheat', 'Gluten-Free'];
const toppings = ['Cheese', 'Pepperoni', 'Mushrooms', 'Onions', 'Olives', 'Bell Peppers'];

function ProductModal({ isOpen, onClose, product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedType, setSelectedType] = useState('Regular');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useBackButton(isOpen, onClose);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      size: selectedSize,
      type: selectedType,
      toppings: selectedToppings,
      quantity
    });
    onClose();
  };

  const toggleTopping = (topping) => {
    setSelectedToppings(prev => 
      prev.includes(topping) 
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const renderOptions = () => {
    switch (product.category) {
      case 'Pizza':
        return (
          <>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Tamaño:</h3>
              <div className="flex gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded ${
                      selectedSize === size ? 'bg-red-600 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Masa:</h3>
              <div className="flex gap-2">
                {crustTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1 rounded ${
                      selectedType === type ? 'bg-violet-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Ingredientes extra:</h3>
              <div className="grid grid-cols-2 gap-2">
                {toppings.map(topping => (
                  <button
                    key={topping}
                    onClick={() => toggleTopping(topping)}
                    className={`px-3 py-1 rounded ${
                      selectedToppings.includes(topping) ? 'bg-green-700 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {topping}
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      case 'Burger':
        return (
          <>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Tamaño:</h3>
              <div className="flex gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded ${
                      selectedSize === size ? 'bg-red-600 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Tipo de pan:</h3>
              <div className="flex gap-2">
                {bunTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1 rounded ${
                      selectedType === type ? 'bg-violet-600 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      case 'Pasta':
        return (
          <>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Tipo de pasta:</h3>
              <div className="flex gap-2">
                {pastaTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1 rounded ${
                      selectedType === type ? 'bg-green-700 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Ingredientes:</h3>
          <p className="text-sm text-gray-600">{product.ingredients.join(', ')}</p>
        </div>

        {renderOptions()}

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Cantidad:</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="px-3 py-1 rounded bg-gray-200"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className="px-3 py-1 rounded bg-gray-200"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Agregar al carrito - ${(product.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
}

export default ProductModal;

