import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "./context/SocketContext";

import {
  getProducts,
  productUpdated,
} from "./products/application/productSlice";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { PromoBanner } from "./components/PromoBanner";
import PaymentCard from "./components/PaymentCard";
import ResponsiveMenuItem from "./components/ResponsiveMenuItem";
import { Footer } from "./components/Footer";
import { BestSellers } from "./components/BestSellers";
import { StickyHeader } from "./components/StickyHeader";
import FavoritesModal from "./components/FavoritesModal";
import SearchModal from "./components/SearchModal";
import FloatingButtons from "./components/FloatingActions";

export default function App() {
  const dispatch = useDispatch();
  const socket = useSocket();

  /* =======================
     REDUX
  ======================= */
  const { items: menuItems, loading, error } = useSelector(
    (state) => state.products
  );

  /* =======================
     UI STATE
  ======================= */
  const [selectedCategory, setSelectedCategory] = useState("Pizzas");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const stickyHeaderHeightRef = useRef(0);

  /* =======================
     BEST SELLERS
  ======================= */
  const getBestsellers = (items) =>
    items.filter((item) => item.bestSeller === true);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const bestSellers = shuffleArray(getBestsellers(menuItems));

  /* =======================
     FETCH PRODUCTS
  ======================= */
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  /* =======================
     SOCKET
  ======================= */
  useEffect(() => {
    if (!socket) return;

    const handler = (product) => {
      console.log("📦 producto actualizado:", product);
      dispatch(productUpdated(product));
    };

    socket.on("product:updated", handler);
    return () => socket.off("product:updated", handler);
  }, [socket, dispatch]);

  /* =======================
     SCROLL POR CATEGORÍA
  ======================= */
  const categoryRef = useRef(null);
  const isFirstRender = useRef(true);
  const hasCategoryChangedRef = useRef(false);

  const handleCategoryChange = (category) => {
    hasCategoryChangedRef.current = true;
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (hasCategoryChangedRef.current && categoryRef.current) {
      const offset = categoryRef.current.offsetTop;

      window.scrollTo({
        top: offset - stickyHeaderHeightRef.current - 70, // mediano margen
        behavior: "smooth",
      });

      hasCategoryChangedRef.current = false;
    }
  }, [selectedCategory]);


  /* =======================
     CART
  ======================= */
  const addToCart = (product) => {
    setCartItems((prev) => [
      ...prev,
      { ...product, cartId: Date.now(), quantity: 1 },
    ]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleEditCartItem = (editedItem) => {
    setCartItems((prev) =>
      prev.map((i) => (i.cartId === editedItem.cartId ? editedItem : i))
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* =======================
     FAVORITES
  ======================= */
  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === productId);
      if (exists) {
        return prev.filter((fav) => fav.id !== productId);
      }
      const product = menuItems.find((p) => p.id === productId);
      return product ? [...prev, product] : prev;
    });
  };

  /* =======================
     SEARCH
  ======================= */
  const normalizeText = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const handleSearch = (searchTerm) => {
    const keywords = normalizeText(searchTerm)
      .split(" ")
      .filter((w) => w.length > 2);

    const results = menuItems.filter((item) => {
      const name = normalizeText(item.name);
      const desc = normalizeText(item.description);
      return keywords.some(
        (k) => name.includes(k) || desc.includes(k)
      );
    });

    setSearchResults(results);
  };

  /* =======================
     FILTER
  ======================= */
  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.category?.toLowerCase() === selectedCategory.toLowerCase()
  );

  /* =======================
     RENDER
  ======================= */
  if (loading) return <div>Cargando menú…</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenFavorites={() => setIsFavoritesModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      <PromoBanner />

      <BestSellers items={bestSellers} onAddToCart={addToCart} />

      <StickyHeader
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        onHeightChange={(height) => {
          stickyHeaderHeightRef.current = height;
        }}
      />

      <div
        ref={categoryRef}
        className="min-h-[500px] lg:px-4 bg-background grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-6"
      >
        {filteredMenuItems.map((item) => (
          <ResponsiveMenuItem
            key={item.id}
            productId={item.id}
            showBestSellerBadge={item.bestseller}
            onAdd={() => addToCart(item)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        ))}
      </div>

      <Footer />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <FloatingButtons
        phoneNumber="+542984307550" //pizzeria +542984655294
        message="Hola, estuve viendo su menú en línea y quisiera ordenar."
      />

      <PaymentCard
        cartItems={cartItems}
        onRemove={removeFromCart}
        total={total}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onEditItem={handleEditCartItem}
      />

      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favorites={favorites}
        onRemoveFromFavorites={toggleFavorite}
        onProductClick={addToCart}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearch}
        searchResults={searchResults}
        onProductClick={addToCart}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
