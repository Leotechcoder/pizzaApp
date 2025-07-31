import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { PromoBanner } from "./components/PromoBanner";
import PaymentCard from "./components/PaymentCard";
import { MenuItem } from "./components/MenuItem";
import { FloatingCartButton } from "./components/FloatingCartButton";
import { Footer } from "./components/Footer";
import { BestSellers } from "./components/BestSellers";
import { StickyHeader } from "./components/StickyHeader";
import FavoritesModal from "./components/FavoritesModal";
import SearchModal from "./components/SearchModal";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";

/*Base de datos provisoria, mas adelante cambiar por tabla en la base de datos postgresql */
const allMenuItems = [
  // Empanadas
  {
    id: 1,
    name: "Carne",
    price: 18000,
    image: "/empanadas/empanada-carne.jpeg",
    description: "Precio x docena",
    category: "Empanada",
    ingredients: ["Cebolla","Morron","Carne Vacuna","Condimentos", "Huevo"], // Ingredients not specified for empanadas in the image
    calories: null,
    preparationTime: null,
    bestseller: true,
  },
  {
    id: 2,
    name: "Pollo",
    price: 18000,
    image: "/empanadas/empanada-pollo.jpeg",
    description: "Precio x docena",
    category: "Empanada",
    ingredients: ["Cebolla","Morron","Carne de Pollo","Condimentos"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 3,
    name: "Jamón y Queso",
    price: 18000, // Price not legible
    image: "/empanadas/empanada-jamon1.jpeg",
    description: "Precio x docena",
    category: "Empanada",
    ingredients: ["Jamón","Queso"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 4,
    name: "Humita",
    price: 18000,
    image: "",
    description: "Precio x docena",
    category: "Empanada",
    ingredients: ["Cebolla","Choclo","Leche", "Condimentos"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 5,
    name: "Roquefort",
    price: 18000, // Price not legible
    image: "/empanadas/empanada-roquefort.jpeg",
    description: "Precio x docena",
    category: "Empanada",
    ingredients: ["Roquefort", "Queso"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 6,
    name: "Cebolla y Queso",
    price: 18000, // Price not legible
    image: "",
    description: "Precio x docena",
    category: "Empanada",
    ingredients: ["Cebolla","Queso", "Condimentos"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },

  // Lomos
  {
    id: 7,
    name: "Lomo Simple",
    price: 17000,
    image: "/lomo.jpg",
    description: "Pan, lechuga, tomate, carne",
    category: "Lomo",
    ingredients: ["Pan", "Lechuga", "Tomate", "Carne"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 8,
    name: "Lomo Completo",
    price: 20000,
    image: "/pizzas/lomocompleto.jpeg",
    description: "Pan, lechuga, tomate, carne, huevo, jamón, queso, aderezos",
    category: "Lomo",
    ingredients: [
      "Pan",
      "Lechuga",
      "Tomate",
      "Carne",
      "Huevo",
      "Jamón",
      "Queso",
      "Aderezos",
    ],
    calories: null,
    preparationTime: null,
    bestseller: true,
  },

  // Hamburguesas
  {
    id: 9,
    name: "Hamburguesa Simple",
    price: 16000,
    image: "",
    description: "Pan, lechuga, tomate, carne",
    category: "Hamburguesa",
    ingredients: ["Pan", "Lechuga", "Tomate", "Carne"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 10,
    name: "Hamburguesa Completa",
    price: 18000,
    image: "",
    description: "Pan, lechuga, tomate, carne, huevo, jamón, queso, aderezos",
    category: "Hamburguesa",
    ingredients: [
      "Pan",
      "Lechuga",
      "Tomate",
      "Carne",
      "Huevo",
      "Jamón",
      "Queso",
      "Aderezos",
    ],
    calories: null,
    preparationTime: null,
    bestseller: true,
  },

  // Pizzas
  {
    id: 11,
    name: "Steve",
    price: 12500,
    image: "",
    description:
      "Salsa, muzzarella, tomate, calabresa, huevo, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Tomate",
      "Calabresa",
      "Huevo",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 12,
    name: "Muzzarella",
    price: 7000,
    image: "/pizzas/muzzafondo.jpg",
    description: "Salsa, muzzarella, orégano, aceitunas",
    category: "Pizza",
    ingredients: ["Salsa", "Muzzarella", "Orégano", "Aceitunas"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 13,
    name: "Aji En Vinagre",
    price: 7300,
    image: "",
    description: "Salsa, muzzarella, ajo, orégano, aceitunas",
    category: "Pizza",
    ingredients: ["Salsa", "Muzzarella", "Ajo", "Orégano", "Aceitunas"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 14,
    name: "Anchoas",
    price: 11000,
    image: "",
    description: "Salsa, anchoas, morrones, orégano, aceitunas",
    category: "Pizza",
    ingredients: ["Salsa", "Anchoas", "Morrones", "Orégano", "Aceitunas"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 15,
    name: "Romana",
    price: 12500,
    image: "",
    description: "Salsa, muzzarella, anchoas, morrones, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Anchoas",
      "Morrones",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 16,
    name: "Fugazzeta",
    price: 10000,
    image: "/pizzas/pizzaconfondo.jpg",
    description: "Cebolla, muzzarella, orégano, aceitunas",
    category: "Pizza",
    ingredients: ["Cebolla", "Muzzarella", "Orégano", "Aceitunas"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 17,
    name: "Especial de Jamón y Morrones",
    price: 12000,
    image: "/pizzas/jamonymorronfondo.jpg",
    description: "Salsa, jamón, muzzarella, morrones, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Jamón",
      "Muzzarella",
      "Morrones",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: true,
  },
  {
    id: 18,
    name: "Jamón",
    price: 8200,
    image: "",
    description: "Salsa, jamón, muzzarella, orégano, aceitunas",
    category: "Pizza",
    ingredients: ["Salsa", "Jamón", "Muzzarella", "Orégano", "Aceitunas"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 19,
    name: "Napolitana",
    price: 10000,
    image: "/pizzas/napolitanafondo.jpg",
    description: "Salsa, muzzarella, tomate, ajo, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Tomate",
      "Ajo",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 20,
    name: "Napolitana Especial",
    price: 12000,
    image: "/pizzas/napolitanaespecialfondo.jpg",
    description:
      "Salsa, jamón, muzzarella, tomate, ajo, parmesano, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Jamón",
      "Muzzarella",
      "Tomate",
      "Ajo",
      "Parmesano",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: true,
  },
  {
    id: 21,
    name: "Roquefort",
    price: 12000,
    image: "",
    description: "Salsa, muzzarella, roquefort, orégano, aceitunas",
    category: "Pizza",
    ingredients: ["Salsa", "Muzzarella", "Roquefort", "Orégano", "Aceitunas"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 22,
    name: "Calabresa",
    price: 12000,
    image: "",
    description: "Salsa, muzzarella, calabresa, morrones, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Calabresa",
      "Morrones",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 23,
    name: "Super Picante",
    price: 12000,
    image: "",
    description:
      "Salsa, muzzarella, calabresa, morrones, picante, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Calabresa",
      "Morrones",
      "Picante",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 24,
    name: "Provoleta",
    price: 12000,
    image: "",
    description:
      "Salsa, jamón, muzzarella, provolone, pimienta, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Jamón",
      "Muzzarella",
      "Provolone",
      "Pimienta",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 25,
    name: "Palmitos",
    price: 13000,
    image: "",
    description:
      "Salsa, jamón, muzzarella, palmitos, huevo, salsa golf, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Jamón",
      "Muzzarella",
      "Palmitos",
      "Huevo",
      "Salsa Golf",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: true,
  },
  {
    id: 26,
    name: "Palmitos Al Roquefort",
    price: 13000,
    image: "",
    description: "Salsa, muzzarella, palmitos, roquefort, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Palmitos",
      "Roquefort",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 27,
    name: "Champiñones",
    price: 14000,
    image: "",
    description:
      "Salsa, muzzarella, salteado de champiñones, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Salteado de champiñones",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 28,
    name: "Ananá",
    price: 13000,
    image: "",
    description:
      "Salsa, muzzarella, jamón, ananá, morrones, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Jamón",
      "Ananá",
      "Morrones",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 29,
    name: "Ananá Glasé",
    price: 13000,
    image: "",
    description: "Salsa, jamón, muzzarella, ananá, caramelo",
    category: "Pizza",
    ingredients: ["Salsa", "Jamón", "Muzzarella", "Ananá", "Caramelo"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 30,
    name: "Atún",
    price: 13000,
    image: "",
    description: "Salsa, muzzarella, atún, morrones, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Atún",
      "Morrones",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 31,
    name: "Luna De Miel",
    price: 13000,
    image: "",
    description:
      "Salsa, muzzarella, roquefort, apio, nueces, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Roquefort",
      "Apio",
      "Nueces",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 32,
    name: "Margarita",
    price: 12000,
    image: "/pizzas/margaritafondo.jpg",
    description:
      "Salsa, muzzarella, tomate perita, albahaca, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Tomate perita",
      "Albahaca",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 33,
    name: "Panceta Y Verdeo O Ajíes",
    price: 14000,
    image: "",
    description:
      "Salsa, muzzarella, panceta ahumada, verdeo o ajíes, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Panceta ahumada",
      "Verdeo o Ajíes",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: true,
  },
  {
    id: 34,
    name: "Crudo Y Rúcula",
    price: 12000,
    image: "",
    description: "Salsa, muzzarella, jamón crudo, rúcula, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Jamón Crudo",
      "Rúcula",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: true,
  },
  {
    id: 35,
    name: "Pollo Con Salsa Golf",
    price: 14000,
    image: "",
    description:
      "Salsa, muzzarella, salteado de pollo, salsa golf, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Salteado de pollo",
      "Salsa golf",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 36,
    name: "Cuatro Quesos",
    price: 13000,
    image: "",
    description:
      "Salsa, muzzarella, provolone, roquefort, parmesano, orégano, aceitunas",
    category: "Pizza",
    ingredients: [
      "Salsa",
      "Muzzarella",
      "Provolone",
      "Roquefort",
      "Parmesano",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: true,
  },

  // Pizzas Rellenas
  {
    id: 37,
    name: "Fugazza Rellena",
    price: 13000,
    image: "/pizzas/fugazza-rellena.jpg",
    description: "Doble masa, muzzarella, jamón, cebolla, orégano, aceitunas",
    category: "Pizza Rellena",
    ingredients: [
      "Doble Masa",
      "Muzzarella",
      "Jamón",
      "Cebolla",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: true,
  },
  {
    id: 38,
    name: "Fugazza Super Rellena",
    price: 15000,
    image: "",
    description:
      "Doble masa, muzzarella, jamón, tomate, ajo, cebolla, orégano, aceitunas",
    category: "Pizza Rellena",
    ingredients: [
      "Doble Masa",
      "Muzzarella",
      "Jamón",
      "Tomate",
      "Ajo",
      "Cebolla",
      "Orégano",
      "Aceitunas",
    ],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },

  // Calzones
  {
    id: 39,
    name: "Napolitano",
    price: 13000,
    image: "",
    description: "Muzzarella, tomate, ajo, jamón",
    category: "Calzón",
    ingredients: ["Muzzarella", "Tomate", "Ajo", "Jamón"],
    calories: null,
    preparationTime: null,
    bestseller: true,
  },
  {
    id: 40,
    name: "Calabresa",
    price: 14700,
    image: "",
    description: "Muzzarella, tomate, calabresa, morrón, jamón",
    category: "Calzón",
    ingredients: ["Muzzarella", "Tomate", "Calabresa", "Morrón", "Jamón"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 41,
    name: "Roquefort",
    price: 14000,
    image: "",
    description: "Muzzarella, tomate, roquefort, morrón, jamón",
    category: "Calzón",
    ingredients: ["Muzzarella", "Tomate", "Roquefort", "Morrón", "Jamón"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 42,
    name: "Atún",
    price: 14000,
    image: "",
    description: "Muzzarella, tomate, atún, morrón",
    category: "Calzón",
    ingredients: ["Muzzarella", "Tomate", "Atún", "Morrón"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 43,
    name: "Jamón y Queso",
    price: 13000,
    image: "",
    description: "Muzzarella, jamón",
    category: "Calzón",
    ingredients: ["Muzzarella", "Jamón"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 44,
    name: "Primavera",
    price: 13000,
    image: "",
    description: "Muzzarella, tomate, morrón, huevo, jamón",
    category: "Calzón",
    ingredients: ["Muzzarella", "Tomate", "Morrón", "Huevo", "Jamón"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
  {
    id: 45,
    name: "Palmitos",
    price: 13000,
    image: "",
    description: "Muzzarella, palmitos, salsa golf, tomate, morrón, jamón",
    category: "Calzón",
    ingredients: [
      "Muzzarella",
      "Palmitos",
      "Salsa Golf",
      "Tomate",
      "Morrón",
      "Jamón",
    ],
    calories: null,
    preparationTime: null,
    bestseller: true,
  },
  {
    id: 46,
    name: "Ananá",
    price: 15000,
    image: "",
    description: "Muzzarella, ananá, morrón, jamón",
    category: "Calzón",
    ingredients: ["Muzzarella", "Ananá", "Morrón", "Jamón"],
    calories: null,
    preparationTime: null,
    bestseller: false,
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Pizza");
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userAvatarUrl, setUserAvatarUrl] = useState("/Pizza-steve-logo-2.png");
  const [showFooter, setShowFooter] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const filteredMenuItems = allMenuItems.filter(
    (item) => item.category === selectedCategory
  );

  /*En esta funcion tengo que manejar la logica de los productos mas vendidos. Se 
  extraeran de la lista de allMenuItems, los items que tengan el campo mas vendido como si. */
  
  const getBestsellers = (listItems) => {
    return listItems.filter(item => item.bestseller === true);
  };

  const bestSellers = getBestsellers(allMenuItems); 


  const addToCart = (product) => {
    setCartItems((prevItems) => [
      ...prevItems,
      { ...product, cartId: Date.now() },
    ]);
  };

  const removeFromCart = (cartId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartId !== cartId)
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === productId)) {
        return prevFavorites.filter((fav) => fav.id !== productId);
      } else {
        const product = allMenuItems.find((item) => item.id === productId);
        return [...prevFavorites, product];
      }
    });
  };

  /*Manejador de busqueda en el nombre o descripcion */
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD") // separa letras y tildes (e.g., "á" → "á")
      .replace(/[\u0300-\u036f]/g, ""); // elimina los signos diacríticos (tildes)
  };

  const handleSearch = (searchTerm) => {
    const normalizedSearch = normalizeText(searchTerm);
    const keywords = normalizedSearch
      .split(" ")
      .filter((word) => word.length > 2); // ignora palabras muy cortas como "de", "la"

    const results = allMenuItems.filter((item) => {
      const name = normalizeText(item.name);
      const description = normalizeText(item.description);

      return keywords.some(
        (keyword) => name.includes(keyword) || description.includes(keyword)
      );
    });

    setSearchResults(results);
  };




  const handleEditCartItem = (editedItem) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === editedItem.cartId ? editedItem : item
      )
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition > pageHeight - 200) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        onOpenSidebar={() => setIsSidebarOpen(true)}
        userAvatarUrl={userAvatarUrl}
        onOpenFavorites={() => setIsFavoritesModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />
      <main className="flex-grow">
        <div className="container mx-auto sm:px-0.5">
          <PromoBanner />
          <BestSellers items={bestSellers} onAddToCart={addToCart} />
          <div className="sticky-header-wrapper">
            <StickyHeader
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4 ms-3">
              <h2 className="text-2xl font-bold">{selectedCategory}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 my-5 mx-3">
              {filteredMenuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  {...item}
                  onAdd={addToCart}
                  isFavorite={favorites.some((fav) => fav.id === item.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <div
        className={`transition-opacity duration-300 ${
          showFooter ? "opacity-100" : "opacity-0"
        }`}
      >
        <Footer />
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* <FloatingCartButton
        itemCount={cartItems.length}
        onClick={() => setIsCartOpen(true)}
      /> */}

      <FloatingWhatsAppButton
        phoneNumber="+542984307550"
        message="Hola, estuve viendo su menu en linea y quisiera ordenar."
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
        onToggleFavorite={toggleFavorite}
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
      <style jsx>{`
        .sticky-header-wrapper {
          position: relative;
          height: auto;
        }
      `}</style>
    </div>
  );
}
