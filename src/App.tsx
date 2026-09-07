import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from './data.json';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { Confirmed } from './components/Confirmed';
import type { CartItem, Product as ProductType } from './types/product';

const CART_STORAGE_KEY = 'velvet_vanilla_cart_v1';

export function App() {
  // 1. Persistent Cart from LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Dynamic unique categories from JSON data
  const categories = useMemo(() => {
    const set = new Set((data as ProductType[]).map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered Products List
  const filteredProducts = useMemo(() => {
    return (data as ProductType[]).filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Quantity updates handler
  const handleUpdateQuantity = (product: ProductType, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.name !== product.name);
      }
      const exists = prevCart.find((item) => item.name === product.name);
      if (exists) {
        return prevCart.map((item) =>
          item.name === product.name ? { ...item, quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const handleRemoveItem = (name: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== name));
  };

  const handleClearCart = () => {
    setCart([]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FCF8F5]">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCartMobile={() => {
          document.getElementById('cart-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Grid + Cart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Products Column */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl font-bold text-amber-950">Desserts Menu</h2>
              <span className="text-xs text-stone-500 font-medium">
                Showing {filteredProducts.length} items
              </span>
            </div>

            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key={selectedCategory + searchQuery}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductGrid
                    products={filteredProducts}
                    cartItems={cart}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                </motion.div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-200">
                  <p className="text-stone-500 text-sm">No delicious treats matched your search.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Column */}
          <div id="cart-section" className="lg:col-span-4 sticky top-24">
            <Cart
              cart={cart}
              onRemoveItem={handleRemoveItem}
              onConfirmOrder={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </main>

      <Footer />

      <Confirmed
        isOpen={isModalOpen}
        cart={cart}
        onNewOrder={handleClearCart}
      />
    </div>
  );
}