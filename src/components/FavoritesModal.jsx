import React from 'react';
import { X } from 'lucide-react';
import { MenuItem } from './MenuItem';
import { useBackButton } from '../hooks/useBackButton';

function FavoritesModal({ isOpen, onClose, favorites, onRemoveFromFavorites, onProductClick, onToggleFavorite }) {
  useBackButton(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Tus Favoritos</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">No tienes productos favoritos aún.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((product) => (
              <MenuItem
                key={product.id}
                {...product}
                isFavorite={true}
                onAdd={() => onProductClick(product)}
                onToggleFavorite={() => onToggleFavorite(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesModal;

