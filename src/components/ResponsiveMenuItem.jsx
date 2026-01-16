import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import ProductModal from "./ProductModal";

/* -------------------------
   Hook media query (safe)
------------------------- */
function useMediaQuery(query) {
  const getMatch = () =>
    typeof window !== "undefined"
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState(getMatch);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    const listener = (e) => setMatches(e.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/* -------------------------
   COMPONENTE
------------------------- */
export default function ResponsiveMenuItem({
  productId,
  onAdd,
  currency = "$",
  showBestSellerBadge = false,
}) {
  const products = useSelector((state) => state.products?.items ?? []);

  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [products, productId]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  if (!product) return null;

  const {
    name,
    description,
    price,
    category,
    images = [],
    stock,
    available,
  } = product;

  if (!available || Number(stock) <= 0) return null;

  const imageUrl = useMemo(() => images[0]?.url ?? null, [images]);

  const formattedPrice = useMemo(() => {
    if (price == null) return null;

    return new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(price));
  }, [price]);

  /* -------------------------
     MOBILE
  ------------------------- */
  if (!isDesktop) {
    return (
      <>
        <div
          className="h-[120px] flex items-center py-1 px-4 bg-white border rounded-xl shadow-md mx-3 cursor-pointer"
          onClick={openModal}
        >
          <div className="flex-1 py-2 pr-2">
            <h3 className="font-semibold text-lg leading-tight">{name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {description}
            </p>

            {formattedPrice && (
              <span className="text-orange-500 font-semibold">
                {currency} {formattedPrice}
              </span>
            )}
          </div>

          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center text-xs text-gray-400 h-full">
                Sin imagen
              </div>
            )}
          </div>
        </div>

        <ProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          productId={productId}
          onAddToCart={onAdd}
        />
      </>
    );
  }

  /* -------------------------
     DESKTOP
  ------------------------- */
  return (
    <>
      <div
        className="h-[350px] group flex flex-col bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
        onClick={openModal}
      >
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center text-gray-400 h-full">
              Sin imagen
            </div>
          )}

          {showBestSellerBadge && (
            <span className="absolute top-2 left-2 bg-red-700 text-white text-sm px-2 py-1 rounded">
              Más vendido
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow gap-1">
          <h3 className="font-bold text-xl leading-tight">{name}</h3>
          <p className="text-sm text-gray-500">{category}</p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>

          <div className="mt-auto pt-3">
            {formattedPrice ? (
              <span className="text-green-600 font-bold text-xl">
                {currency} {formattedPrice}
              </span>
            ) : (
              <span className="italic text-gray-500 text-sm">
                Consultar
              </span>
            )}
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        productId={productId}
        onAddToCart={onAdd}
      />
    </>
  );
}
