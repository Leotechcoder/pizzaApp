import React, { useState, useEffect, useRef } from 'react';
import { CategoryButtons } from './CategoryButtons';

export function StickyHeader({ selectedCategory, onSelectCategory }) {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && placeholderRef.current) {
        const placeholderRect = placeholderRef.current.getBoundingClientRect();

        if (placeholderRect.top <= 75 && !isSticky) {
          setIsSticky(true);
        } else if (placeholderRect.top > 75 && isSticky) {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky]);

  return (
    <>
      {/* Placeholder para mantener el flujo visual */}
      <div ref={placeholderRef} style={{ height: isSticky ? '75px' : '0' }} />
      {/* Header sticky con clases dinámicas */}
      <div
        ref={headerRef}
        className={`bg-white z-20 transition-all duration-300 ${
          isSticky ? 'fixed pt-3 top-12 left-0 right-0 shadow-md rounded-2xl' : 'rounded-2xl'
        }`}
      >
        <div className="container mx-auto px-4">
          <CategoryButtons 
            selectedCategory={selectedCategory} 
            onSelectCategory={onSelectCategory}
          />
        </div>
      </div>
    </>
  );
}
