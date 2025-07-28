import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MenuItem } from './MenuItem';
import { useBackButton } from '../hooks/useBackButton';

function SearchModal({ isOpen, onClose, onSearch, searchResults, onProductClick, favorites, onToggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  useBackButton(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Buscar Productos</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full rounded border p-2"
            />
            <button
              type="submit"
              className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            >
              Todos
            </button>
          </div>
        </form>
        {searchResults.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((product) => (
              <MenuItem
                key={product.id}
                {...product}
                isFavorite={favorites.some(fav => fav.id === product.id)}
                onAdd={() => {
                  onProductClick(product);
                  handleClose();
                }}
                onToggleFavorite={() => onToggleFavorite(product.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
}

export default SearchModal;

