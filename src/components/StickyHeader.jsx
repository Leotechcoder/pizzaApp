import React, { useState, useEffect, useRef } from "react";
import { CategoryButtons } from "./CategoryButtons";

export function StickyHeader({ categories, selectedCategory, onSelectCategory, onHeightChange }) {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!placeholderRef.current) return;

      const { top } = placeholderRef.current.getBoundingClientRect();
      setIsSticky(top <= 75);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current && onHeightChange) {
      onHeightChange(headerRef.current.offsetHeight);
    }
  }, [isSticky, onHeightChange]);

  return (
    <>
      <div
        ref={placeholderRef}
        style={{ height: isSticky ? headerRef.current?.offsetHeight : 0 }}
      />

      <div
        ref={headerRef}
        className={`bg-white z-20 transition-all duration-300 ${
          isSticky
            ? "fixed top-12 left-0 right-0 shadow-md rounded-2xl"
            : "rounded-2xl"
        }`}
      >
        <div className="container px-4">
          <CategoryButtons
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>
      </div>
    </>
  );
}
