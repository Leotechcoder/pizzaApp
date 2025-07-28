import React from 'react';

const categories = ['Pizza', 'Burger', 'Pasta', 'Drink'];

export function CategoryButtons({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`flex-shrink-0 px-4 py-2 rounded-full ${
            selectedCategory === category
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

