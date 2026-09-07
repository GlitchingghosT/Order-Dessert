import './App.css';
import { useState } from 'react';
import Cart from './components/Cart';
import ProductGrid from './components/ProductGrid';
import OrderModal from './components/OrderModal'; // 1. Import OrderModal
import type { CartItem, Product } from "./types/product";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleUpdateQuantity = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);

      if (quantity <= 0) {
        return prevItems.filter((item) => item.name !== product.name);
      }

      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name ? { ...item, quantity } : item
        );
      }

      return [...prevItems, { ...product, quantity }];
    });
  };

  const handleRemoveItem = (productName: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== productName));
  };

  const handleConfirmOrder = () => {
    if (cartItems.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleResetOrder = () => {
    setCartItems([]);
    setIsModalOpen(false);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className='py-10 min-h-screen mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 bg-[var(--Rose-100)]'>
      <h1 className='text-4xl text-[var(--Rose-900)] font-bold text-start'>Desserts</h1>
      <div className='md:flex gap-10 pt-6'>
        <div className='md:w-[70%]'>
          <ProductGrid
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </div>
        <div className='md:w-[30%]'>
          <Cart
            cartItems={cartItems}
            onRemoveItem={handleRemoveItem}
            onConfirmOrder={handleConfirmOrder}
          />
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        cartItems={cartItems}
        totalPrice={totalPrice}
        onResetOrder={handleResetOrder}
      />
    </main>
  );
}

export default App;