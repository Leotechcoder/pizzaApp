import React, { useState } from 'react';
import { X, Edit2, Trash2 } from 'lucide-react';
import { useBackButton } from '../hooks/useBackButton';

const pizzaSizes = ['Personal', 'Mediana', 'Familiar'];
const extraToppings = ['Queso extra', 'Champiñones', 'Aceitunas', 'Cebolla', 'Pimiento'];
const hamburgerExtras = ['Bacon', 'Huevo frito', 'Queso extra', 'Cebolla caramelizada'];
const lomitoExtras = ['Huevo frito', 'Queso extra', 'Jamón', 'Panceta'];

function PaymentCard({ cartItems, onRemove, total, isOpen, onClose, onEditItem }) {
  const [editingItem, setEditingItem] = useState(null);

  useBackButton(isOpen, onClose);

  if (!isOpen) return null;

  const getExtraOptions = (category) => {
    switch (category) {
      case 'Pizza':
        return extraToppings;
      case 'Burger':
        return hamburgerExtras;
      case 'Lomito':
        return lomitoExtras;
      default:
        return [];
    }
  };

  const handleEditItem = (item) => {
    onEditItem(item);
  };

  const renderItemDetails = (item) => (
    <div className="flex-grow">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      {item.size && <p className="text-sm">Tamaño: {item.size}</p>}
      {item.extras && item.extras.length > 0 && (
        <p className="text-sm">Extras: {item.extras.join(", ")}</p>
      )}
      {item.additionalComments && (
        <p className="text-sm">Comentarios: {item.additionalComments}</p>
      )}
      <p className="text-sm">Cantidad: {item.quantity}</p>
      <p className="text-sm font-semibold">
        Precio: ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="mb-4 text-2xl font-bold">Carrito de Compras</h2>
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.cartId} className="mb-4 flex items-start border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="mr-4 h-20 w-20 rounded-lg object-cover"
                />
                {renderItemDetails(item)}
                <div className="ml-2 flex flex-col gap-2">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onRemove(item.cartId)}
                    className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 border-t pt-4">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            </div>
            <button className="mt-4 w-full rounded bg-orange-500 py-2 text-white hover:bg-orange-600">
              Proceder al pago
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentCard;

