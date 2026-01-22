import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "./context/SocketContext";

import {
  getProducts,
  productUpdated,
} from "./products/application/productSlice";

import {
  addItemToCart,
  removeItemFromCart,
  editCartItem,
} from "./orders/application/cartSlice";

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
import CheckoutForm from "./components/CheckoutForm";
import { clearCurrentOrder } from "./orders/application/orderSlice";

export default function Home() {
  const dispatch = useDispatch();
  const socket = useSocket();

  /* =======================
     REDUX
  ======================= */
  const {
    items: menuItems,
    loading,
    error,
  } = useSelector((state) => state.products);

  const cartItems = useSelector((state) => state.cart.items);

  /* =======================
     UI STATE
  ======================= */
  const [selectedCategory, setSelectedCategory] = useState("Pizzas");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const stickyHeaderHeightRef = useRef(0);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  //Whatsapp

  const currentOrder = useSelector((state) => state.orders.currentOrder);

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
        top: offset - stickyHeaderHeightRef.current - 70,
        behavior: "smooth",
      });

      hasCategoryChangedRef.current = false;
    }
  }, [selectedCategory]);

  /* =======================
      MENSAJE WHATSAPP
    ======================= */

  useEffect(() => {
    if (!currentOrder) return;

    // 1️⃣ Armar mensaje
    const message = encodeURIComponent(
      `Hola, realicé un pedido a nombre de ${currentOrder.userName}.
      Orden: ${currentOrder.id}.`,
    );

    // 2️⃣ Número de WhatsApp
    const phone = "542984307550"; // SIN +

    // 3️⃣ Abrir WhatsApp
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    // 4️⃣ Limpiar currentOrder
    dispatch(clearCurrentOrder());
  }, [currentOrder, dispatch]);

  /* =======================
     CART (REDUX)
  ======================= */
  const addToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const removeFromCart = (cartId) => {
    dispatch(removeItemFromCart(cartId));
  };

  const handleEditCartItem = (editedItem) => {
    dispatch(editCartItem(editedItem));
  };

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
      return keywords.some((k) => name.includes(k) || desc.includes(k));
    });

    setSearchResults(results);
  };

  /* =======================
     FILTER
  ======================= */
  const filteredMenuItems = menuItems.filter(
    (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase(),
  );

  const visibleProducts = filteredMenuItems.filter(
    (p) => p.available && p.stock > 0,
  );

  const ALL_CATEGORIES = [
    "Pizzas",
    "Hamburguesas",
    "Empanadas",
    "Lomos",
    "Bebidas",
  ];

  const availableCategories = ALL_CATEGORIES.filter((category) =>
    menuItems.some(
      (item) =>
        item.category?.toLowerCase() === category.toLowerCase() &&
        item.available &&
        item.stock > 0,
    ),
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
        onOpenCart={() => setIsCartOpen(true)}
      />

      <PromoBanner />

      <BestSellers items={bestSellers} onAddToCart={addToCart} />

      <StickyHeader
        categories={availableCategories}
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
        {visibleProducts.map((item) => (
          <ResponsiveMenuItem
            key={item.id}
            productId={item.id}
            showBestSellerBadge={item.bestSeller}
            onAdd={addToCart}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        ))}
      </div>

      <Footer />

      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <FloatingButtons
        phoneNumber="+542984307550"
        message="Hola, estuve viendo su menú en línea y quisiera ordenar."
      />

      <PaymentCard
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCloseCheckout={() => setIsCheckoutOpen(true)}
        onRemove={removeFromCart}
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
