import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MenuItem } from './MenuItem';
import { useBackButton } from '../hooks/useBackButton';

function SearchModal({ isOpen, onClose, onSearch, searchResults, onProductClick }) {
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
          <div className="relative w-full flex gap-2">
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full rounded border p-2 pr-10"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="shrink-0 rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            >
              Buscar
            </button>
          </div>
        </form>

        {searchResults.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((product) => (
              <MenuItem
                key={product.id}
                {...product}
                onAdd={() => {
                  onProductClick(product);
                  handleClose();
                }}
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
