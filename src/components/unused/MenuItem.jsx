import { useState } from "react";
import { Plus } from "lucide-react";
import ProductModal from "../ProductModal";

export function MenuItem({
  product,
  onAdd,
  showBestSellerBadge = false,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) return null;

  const {
    id,
    name,
    price,
    category,
    description,
    images = [],
    available,
    stock,
    bestSeller,
  } = product;


  const imageUrl = images[0]?.url ?? null;

  const formattedPrice =
    price != null
      ? new Intl.NumberFormat("es-AR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(Number(price))
      : null;

  /* =============================
     RENDER
  ============================= */
  return (
    <>
      <div
        className="group flex flex-col bg-white rounded-3xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Imagen */}
        <div className="relative w-full h-40 md:h-42 lg:h-48 bg-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
              Sin imagen
            </div>
          )}

          {/* Badge */}
          <div className="absolute top-2 left-2 bg-red-700 text-white text-xs px-2 py-1 rounded">
            Más vendido
          </div>
        </div>

        {/* Contenido */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg mb-1 text-gray-900 leading-tight">
            {name}
          </h3>

          <p className="text-gray-500 text-sm mb-2">{category}</p>

          <p className="text-gray-600 text-sm mb-2 flex-grow line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between mt-3">
            {formattedPrice ? (
              <span className="text-green-600 font-bold text-xl">
                ${formattedPrice}
              </span>
            ) : (
              <span className="italic text-gray-500 text-sm">
                Consultar
              </span>
            )}

            <div className="flex items-center gap-1 bg-green-600 text-white text-sm px-3 py-1 rounded-full">
              <Plus size={16} />
              Agregar
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={id}
        onAddToCart={onAdd}
      />
    </>
  );
}
