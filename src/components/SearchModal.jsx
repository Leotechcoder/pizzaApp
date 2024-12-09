import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    // Simulated search results
    const results = ['Margherita', 'Pepperoni', 'Vegetarian', 'Hawaiian']
      .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  }, [searchTerm]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={handleClickOutside}>
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Search</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <input
          type="search"
          placeholder="Search for pizzas..."
          className="w-full p-2 border rounded-md mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        {searchResults.length > 0 ? (
          <ul className="space-y-2">
            {searchResults.map((result, index) => (
              <li key={index} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                {result}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
}

