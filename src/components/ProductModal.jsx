import { useSelector } from "react-redux";
import { X } from "lucide-react";

export default function ProductModal({
  isOpen,
  onClose,
  productId,
  onAddToCart,
}) {
  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === productId)
  );

  if (!isOpen || !product) return null;

  if (!product.available || product.stock === 0) {
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button
          onClick={() => {
            onAddToCart(product);
            onClose();
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
