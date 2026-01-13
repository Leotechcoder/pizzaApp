import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "./context/SocketContext";

import {
  getProducts,
  productUpdated,
} from "./products/application/productSlice";

import ResponsiveMenuItem from "./components/ResponsiveMenuItem";
import { Header } from "./components/Header";
import { PromoBanner } from "./components/PromoBanner";
import { StickyHeader } from "./components/StickyHeader";
import { BestSellers } from "./components/BestSellers";
import { Footer } from "./components/Footer";

export default function App() {
  const dispatch = useDispatch();
  const socket = useSocket(); // ✅ AHORA SÍ

  const { items: menuItems, loading, error } = useSelector(
    (state) => state.products
  );

  const [selectedCategory, setSelectedCategory] = useState("Pizzas");
  const categoryRef = useRef(null);

    /*En esta funcion tengo que manejar la logica de los productos mas vendidos. Se 
  extraeran de la lista de menuItems, los items que tengan el campo mas vendido como si. */

  const getBestsellers = (listItems) => {
    return listItems.filter((item) => item.bestseller === true);
  };
  const bestRandom = getBestsellers(menuItems);

  /*Esta funcion devuelve el mismo array con los elementos en orden aleatorio */
  function shuffleArray(array) {
    const shuffled = [...array]; // copiar el array original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
    }
    return shuffled;
  }

  const bestSellers = shuffleArray(bestRandom);
  /* ---------- FETCH ---------- */
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  /* ---------- SOCKET ---------- */
  useEffect(() => {
    if (!socket) return;

    const handler = (product) => {
      console.log("📦 producto actualizado:", product);
      dispatch(productUpdated(product));
    };

    socket.on("product:updated", handler);

    return () => {
      socket.off("product:updated", handler);
    };
  }, [socket, dispatch]);

  /* ---------- FILTROS ---------- */
  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.category?.toLowerCase() === selectedCategory.toLowerCase()
  );

  if (loading) return <div>Cargando menú…</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <PromoBanner />

      <BestSellers
        items={bestSellers}
        onAddToCart={(p) => console.log("add", p)}
      />

      <StickyHeader
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div
        ref={categoryRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-6"
      >
        {filteredMenuItems.map((item) => (
          <ResponsiveMenuItem
            key={item.id}
            productId={item.id} // ✅ CLAVE
            showBestSellerBadge={item.bestseller}
            onAdd={(p) => console.log("add", p)}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
