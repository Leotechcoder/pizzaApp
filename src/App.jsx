import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { PromoBanner } from "./components/PromoBanner";
import { PaymentCard } from "./components/PaymentCard";
import { MenuItem } from "./components/MenuItem";
import { FloatingCartButton } from "./components/FloatingCartButton";
import { Footer } from "./components/Footer";
import { BestSellers } from "./components/BestSellers"
import { StickyHeader } from "./components/StickyHeader"


const allMenuItems = [
  // Pizza
  { id: 1, name: "Margherita", price: 12, image: "/pizza-margarita.jpg", description: "Classic tomato and mozzarella", category: "Pizza", ingredients: ["Tomato sauce", "Mozzarella", "Basil"], calories: 850, preparationTime: "15 min" },
  { id: 2, name: "Pepperoni", price: 14, image: "/pizza-piedra.jpg", description: "Spicy pepperoni with mozzarella", category: "Pizza", ingredients: ["Tomato sauce", "Mozzarella", "Pepperoni"], calories: 1050, preparationTime: "18 min" },
  { id: 3, name: "Vegetarian", price: 13, image: "/pizzas-piedra.jpg", description: "Assorted vegetables and cheese", category: "Pizza", ingredients: ["Tomato sauce", "Mozzarella", "Bell peppers", "Mushrooms", "Onions"], calories: 800, preparationTime: "20 min" },
  { id: 4, name: "Hawaiian", price: 15, image: "/placeholder.svg", description: "Ham and pineapple", category: "Pizza", ingredients: ["Tomato sauce", "Mozzarella", "Ham", "Pineapple"], calories: 950, preparationTime: "17 min" },
  { id: 5, name: "BBQ Chicken", price: 16, image: "/placeholder.svg", description: "BBQ sauce with chicken and onions", category: "Pizza", ingredients: ["BBQ sauce", "Mozzarella", "Chicken", "Red onions"], calories: 1100, preparationTime: "22 min" },
  { id: 6, name: "Meat Lovers", price: 17, image: "/placeholder.svg", description: "Assorted meats and cheese", category: "Pizza", ingredients: ["Tomato sauce", "Mozzarella", "Pepperoni", "Sausage", "Bacon", "Ground beef"], calories: 1250, preparationTime: "25 min" },
  { id: 7, name: "Mushroom Delight", price: 14, image: "/placeholder.svg", description: "Assorted mushrooms and truffle oil", category: "Pizza", ingredients: ["Cream sauce", "Mozzarella", "Assorted mushrooms", "Truffle oil"], calories: 900, preparationTime: "20 min" },

  // Burger
  { id: 8, name: "Classic Burger", price: 10, image: "/placeholder.svg", description: "Beef patty with lettuce and tomato", category: "Burger", ingredients: ["Beef patty", "Lettuce", "Tomato", "Onion", "Pickles"], calories: 650, preparationTime: "10 min" },
  { id: 9, name: "Cheeseburger", price: 11, image: "/placeholder.svg", description: "Classic burger with cheese", category: "Burger", ingredients: ["Beef patty", "Cheese", "Lettuce", "Tomato", "Onion"], calories: 750, preparationTime: "12 min" },
  { id: 10, name: "Bacon Burger", price: 12, image: "/placeholder.svg", description: "Burger with bacon and cheese", category: "Burger", ingredients: ["Beef patty", "Bacon", "Cheese", "Lettuce", "Tomato"], calories: 850, preparationTime: "15 min" },
  { id: 11, name: "Veggie Burger", price: 10, image: "/placeholder.svg", description: "Plant-based patty with veggies", category: "Burger", ingredients: ["Veggie patty", "Lettuce", "Tomato", "Cucumber", "Vegan mayo"], calories: 450, preparationTime: "12 min" },
  { id: 12, name: "Mushroom Swiss", price: 12, image: "/placeholder.svg", description: "Burger with mushrooms and Swiss cheese", category: "Burger", ingredients: ["Beef patty", "Swiss cheese", "Sautéed mushrooms", "Lettuce"], calories: 700, preparationTime: "14 min" },
  { id: 13, name: "BBQ Burger", price: 13, image: "/placeholder.svg", description: "Burger with BBQ sauce and onion rings", category: "Burger", ingredients: ["Beef patty", "BBQ sauce", "Onion rings", "Cheddar cheese"], calories: 900, preparationTime: "16 min" },
  { id: 14, name: "Spicy Jalapeno", price: 12, image: "/placeholder.svg", description: "Burger with jalapenos and spicy sauce", category: "Burger", ingredients: ["Beef patty", "Jalapenos", "Pepper jack cheese", "Spicy sauce"], calories: 750, preparationTime: "13 min" },

  // Pasta
  { id: 15, name: "Spaghetti Bolognese", price: 13, image: "/placeholder.svg", description: "Classic meat sauce pasta", category: "Pasta", ingredients: ["Spaghetti", "Ground beef", "Tomato sauce", "Parmesan"], calories: 650, preparationTime: "20 min" },
  { id: 16, name: "Fettuccine Alfredo", price: 14, image: "/placeholder.svg", description: "Creamy Parmesan sauce pasta", category: "Pasta", ingredients: ["Fettuccine", "Heavy cream", "Parmesan", "Garlic"], calories: 800, preparationTime: "18 min" },
  { id: 17, name: "Penne Arrabbiata", price: 12, image: "/placeholder.svg", description: "Spicy tomato sauce pasta", category: "Pasta", ingredients: ["Penne", "Spicy tomato sauce", "Garlic", "Red pepper flakes"], calories: 550, preparationTime: "15 min" },
  { id: 18, name: "Lasagna", price: 15, image: "/placeholder.svg", description: "Layered pasta with meat and cheese", category: "Pasta", ingredients: ["Lasagna sheets", "Ground beef", "Ricotta", "Mozzarella"], calories: 750, preparationTime: "40 min" },
  { id: 19, name: "Carbonara", price: 14, image: "/placeholder.svg", description: "Creamy egg and bacon pasta", category: "Pasta", ingredients: ["Spaghetti", "Eggs", "Bacon", "Parmesan"], calories: 700, preparationTime: "22 min" },
  { id: 20, name: "Pesto Pasta", price: 13, image: "/placeholder.svg", description: "Basil pesto sauce pasta", category: "Pasta", ingredients: ["Fusilli", "Basil pesto", "Pine nuts", "Parmesan"], calories: 600, preparationTime: "16 min" },
  { id: 21, name: "Seafood Pasta", price: 16, image: "/placeholder.svg", description: "Mixed seafood in tomato sauce", category: "Pasta", ingredients: ["Linguine", "Shrimp", "Mussels", "Tomato sauce"], calories: 550, preparationTime: "25 min" },

  // Drink
  { id: 22, name: "Cola", price: 2, image: "/placeholder.svg", description: "Classic cola drink", category: "Drink", ingredients: ["Carbonated water", "Sugar", "Caramel color", "Phosphoric acid"], calories: 140, volume: "330ml" },
  { id: 23, name: "Lemonade", price: 3, image: "/placeholder.svg", description: "Fresh squeezed lemonade", category: "Drink", ingredients: ["Lemon juice", "Water", "Sugar"], calories: 120, volume: "400ml" },
  { id: 24, name: "Iced Tea", price: 2, image: "/placeholder.svg", description: "Refreshing iced tea", category: "Drink", ingredients: ["Black tea", "Water", "Sugar"], calories: 90, volume: "500ml" },
  { id: 25, name: "Orange Juice", price: 3, image: "/placeholder.svg", description: "Freshly squeezed orange juice", category: "Drink", ingredients: ["Orange juice"], calories: 160, volume: "350ml" },
  { id: 26, name: "Milkshake", price: 4, image: "/placeholder.svg", description: "Creamy vanilla milkshake", category: "Drink", ingredients: ["Milk", "Vanilla ice cream", "Whipped cream"], calories: 350, volume: "400ml" },
  { id: 27, name: "Smoothie", price: 4, image: "/placeholder.svg", description: "Mixed fruit smoothie", category: "Drink", ingredients: ["Banana", "Strawberries", "Yogurt", "Honey"], calories: 200, volume: "450ml" },
  { id: 28, name: "Espresso", price: 2, image: "/placeholder.svg", description: "Strong Italian coffee", category: "Drink", ingredients: ["Coffee beans"], calories: 5, volume: "30ml" },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Pizza");
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userAvatarUrl, setUserAvatarUrl] = useState("https://i.pravatar.cc/150?img=68");
  const [showFooter, setShowFooter] = useState(false);

  const filteredMenuItems = allMenuItems.filter(item => item.category === selectedCategory);
  const bestSellers = allMenuItems.slice(0, 5);

  const addToCart = (product) => {
    setCartItems(prevItems => [...prevItems, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} userAvatarUrl={userAvatarUrl} />
      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <PromoBanner />
          <div className="sticky-header-wrapper">
            <StickyHeader 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory}
            />
          </div>
          <BestSellers items={bestSellers} onAddToCart={addToCart} />
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMenuItems.map(item => (
                <MenuItem
                  key={item.id}
                  {...item}
                  onAdd={addToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <div className={`transition-opacity duration-300 ${showFooter ? 'opacity-100' : 'opacity-0'}`}>
        <Footer />
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <FloatingCartButton 
        itemCount={cartItems.length} 
        onClick={() => setIsCartOpen(true)} 
      />
      <PaymentCard 
        cartItems={cartItems} 
        onRemove={removeFromCart} 
        total={total}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
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
