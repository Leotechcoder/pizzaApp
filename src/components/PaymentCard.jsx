import React from 'react';
import { X } from 'lucide-react';

export function PaymentCard({ cartItems, onRemove, total, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.cartId} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.size}, {item.type}
                    {item.toppings && item.toppings.length > 0 && `, ${item.toppings.join(', ')}`}
                  </p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">${(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => onRemove(item.cartId)} className="text-red-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors mt-4">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

