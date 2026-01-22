import React, { useState } from "react";
import { X, Edit2, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useBackButton } from "../hooks/useBackButton";

function PaymentCard({ isOpen, onClose, onRemove, onEditItem, onCloseCheckout}) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  const [editingItem, setEditingItem] = useState(null);

  useBackButton(isOpen, onClose);

  if (!isOpen) return null;

  /* =============================
     HANDLERS
  ============================= */
  const handleEditItem = (item) => {
    setEditingItem(item);
    onEditItem?.(item);
  };

  const handlePayment = () => {
    onClose();
    onCloseCheckout();
  }


  /* =============================
     RENDER HELPERS
  ============================= */
  const renderItemDetails = (item) => {
    const quantity = Number(item.quantity) || 1;
    const price = Number(item.price) || 0;
    const subtotal = price * quantity;

    return (
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.name}</h3>

        {item.description && (
          <p className="text-sm text-gray-600">{item.description}</p>
        )}

        {item.size && (
          <p className="text-sm">
            Tamaño: <span className="font-medium">{item.size}</span>
          </p>
        )}

        {item.pizzaType && (
          <p className="text-sm">
            Tipo: <span className="font-medium">{item.pizzaType}</span>
          </p>
        )}

        {Array.isArray(item.extras) && item.extras.length > 0 && (
          <p className="text-sm">
            Extras:{" "}
            <span className="font-medium">{item.extras.join(", ")}</span>
          </p>
        )}

        {item.additionalComments && (
          <p className="text-sm italic text-gray-700">
            Comentarios:{" "}
            <span className="font-medium">{item.additionalComments}</span>
          </p>
        )}

        <p className="text-sm">Cantidad: {quantity}</p>

        <p className="text-sm font-semibold">
          Subtotal: ${subtotal.toFixed(2)}
        </p>
      </div>
    );
  };

  /* =============================
     RENDER
  ============================= */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="mb-4 text-2xl font-bold">Carrito de Compras</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Tu carrito está vacío.</p>
        ) : (
          <>
            {cartItems.map((item) => {
              const imageUrl =
                item.image ||
                item.images?.[0]?.url ||
                "/placeholder.png";

              return (
                <div
                  key={item.cartId ?? item.id}
                  className="mb-4 flex items-start gap-4 border-b pb-4"
                >
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  {renderItemDetails(item)}

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleEditItem(item)}
                      className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
                      title="Editar"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => onRemove(item.cartId ?? item.id)}
                      className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="mt-4 border-t pt-4">
              <p className="text-xl font-bold">
                Total: ${Number(total).toFixed(2)}
              </p>
            </div>

            <button
              onClick={handlePayment}
              className="mt-4 w-full rounded-lg bg-orange-500 py-2 text-white hover:bg-orange-600"
            >
              Proceder al pago
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentCard;
