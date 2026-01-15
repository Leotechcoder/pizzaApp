// src/components/BestSellers.jsx
import { MenuItem } from "./MenuItem";

export function BestSellers({ items = [], onAddToCart }) {
  if (!items.length) return null;

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4 mx-3 md:mx-1">
        <h2 className="text-2xl font-bold">Más Vendidos</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mx-2 p-2">
        {items.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-60 first:ml-0.5"
          >
            <MenuItem
              product={product}
              onAdd={() => onAddToCart(product)}
              showBestSellerBadge={product.bestSeller}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
