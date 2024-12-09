import React, { useState, useEffect, useRef } from 'react';
import { CategoryButtons } from './CategoryButtons';

export function StickyHeader({ selectedCategory, onSelectCategory }) {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = headerRef.current;
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    const handleScroll = () => {
      if (header) {
        const headerTop = header.getBoundingClientRect().top;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (headerTop <= 0 && scrollTop > 0) {
          setIsSticky(true);
        } else if (scrollTop === 0) {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div style={{ height: isSticky ? `${headerHeight}px` : '0' }} />
      <div 
        ref={headerRef}
        className={`bg-white z-20 transition-all duration-300 ${
          isSticky ? 'fixed top-0 left-0 right-0 shadow-md' : ''
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

