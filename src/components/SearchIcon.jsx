import React from 'react';
import { Search } from 'lucide-react';

export function SearchIcon({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
    >
      <Search className="w-5 h-5" />
    </button>
  );
}

