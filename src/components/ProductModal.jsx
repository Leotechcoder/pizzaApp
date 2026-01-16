import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useBackButton } from "../hooks/useBackButton";

const PIZZA_SIZES = ["Personal", "Mediana", "Familiar"];
const PIZZA_TYPES = ["Completa", "Mitad"];

export default function ProductModal({
  isOpen,
  onClose,
  productId,
  onAddToCart,
}) {
  /* =============================
     STORE
  ============================= */
  const product = useSelector(
    (state) =>
      state?.products?.items?.find((p) => p.id === productId) || null
  );

  /* =============================
     STATE
  ============================= */
  const [quantity, setQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState("1");
  const [quantityError, setQuantityError] = useState("");

  const [size, setSize] = useState("Personal");
  const [pizzaType, setPizzaType] = useState("Completa");
  const [comments, setComments] = useState("");

  useBackButton(isOpen, onClose);

  /* =============================
     DERIVED DATA
  ============================= */
  const stock = Number(product?.stock) || 0;
  const price = Number(product?.price) || 0;
  const isPizza = product?.category === "Pizzas";

  const imageUrl = product?.images?.[0]?.url || "/placeholder.png";

  const showPizzaType =
    isPizza && (size === "Mediana" || size === "Familiar");

  const isHalfPizza = showPizzaType && pizzaType === "Mitad";

  const canAddToCart =
    stock > 0 &&
    !quantityError &&
    (isHalfPizza ? stock >= 1 : quantity <= stock);

  /* =============================
     EFFECTS
  ============================= */
  useEffect(() => {
    if (!product) return;

    setQuantity(1);
    setQuantityInput("1");
    setQuantityError("");
    setSize("Personal");
    setPizzaType("Completa");
    setComments("");
  }, [productId]);

  // Forzar mitad → cantidad 1
  useEffect(() => {
    if (isHalfPizza) {
      setQuantity(1);
      setQuantityInput("1");
      setQuantityError("");
    }
  }, [isHalfPizza]);

  /* =============================
     VALIDATION
  ============================= */
  const validateQuantity = (value) => {
    const num = Number(value);

    if (!value) {
      setQuantityError("La cantidad es obligatoria");
      return;
    }

    if (Number.isNaN(num) || num < 1) {
      setQuantityError("Cantidad inválida");
      return;
    }

    if (num > stock) {
      setQuantityError(`Stock máximo disponible: ${stock}`);
      return;
    }

    setQuantity(num);
    setQuantityError("");
  };

  /* =============================
     GUARDS
  ============================= */
  if (!isOpen || !product) return null;
  if (!product.available || stock === 0) return null;

  /* =============================
     HANDLERS
  ============================= */
  const handleAddToCart = () => {
    if (!canAddToCart) return;

    onAddToCart({
      name: product.name,
      id: product.id,
      price: price,
      category: product.category,
      description: product.description,
      images: product.images,
      quantity: isHalfPizza ? 1 : quantity,
      size: isPizza ? size : undefined,
      pizzaType: showPizzaType ? pizzaType : undefined,
      additionalComments: comments || undefined,
    });

    onClose();
  };

  /* =============================
     RENDER
  ============================= */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-2 flex items-center gap-1 rounded-full bg-zinc-700 p-2 text-gray-200 hover:text-gray-100"
        >
          Cerrar <X className="h-5 w-5" />
        </button>

        {/* Image */}
        <img
          src={imageUrl}
          alt={product.name}
          className="my-4 h-48 w-full rounded-lg object-cover"
        />

        <h2 className="mb-2 text-2xl font-bold">{product.name}</h2>

        {product.description && (
          <p className="mb-4 text-gray-600">{product.description}</p>
        )}

        <div className="mb-4 flex justify-between text-sm text-gray-600">
          <span className="text-lg font-semibold">
            ${price.toFixed(2)}
          </span>
          <span>Stock: {stock}</span>
        </div>

        {/* Tamaño */}
        {isPizza && (
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Tamaño</h3>
            <div className="flex gap-2 flex-wrap">
              {PIZZA_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    size === s
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tipo */}
        {showPizzaType && (
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Tipo</h3>
            <div className="flex gap-2">
              {PIZZA_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setPizzaType(type)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    pizzaType === type
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cantidad */}
        {!isHalfPizza && (
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Cantidad</h3>
            <input
              type="number"
              min="1"
              value={quantityInput}
              onChange={(e) => {
                setQuantityInput(e.target.value);
                setQuantityError("");
              }}
              onBlur={(e) => validateQuantity(e.target.value)}
              className={`w-full rounded border p-2 ${
                quantityError ? "border-red-500" : ""
              }`}
            />
            {quantityError && (
              <p className="mt-1 text-sm text-red-500">
                {quantityError}
              </p>
            )}
          </div>
        )}

        {/* Comentarios */}
        <div className="mb-4">
          <h3 className="mb-2 font-semibold">Comentarios</h3>
          <textarea
            rows={3}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className={`w-full rounded-lg py-2 text-white ${
            canAddToCart
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
