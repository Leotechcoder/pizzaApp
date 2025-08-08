
export default function ProductCard({ name, description, price, image, currency = "$", onAddToCart }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-100 mb-3">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{name}</h3>
        <p className="text-xs text-gray-600 mb-2 leading-relaxed">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-orange-500 font-bold text-sm">
            {currency} {formatPrice(price)}
          </span>
        </div>
      </div>
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
      {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
                  Sin imagen
                </div>
            )}
      </div>
    </div>
  )
}
