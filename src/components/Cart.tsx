import React from 'react';
import type { CartItem } from '../types/product';
import { IoMdCloseCircleOutline } from 'react-icons/io';

interface CartProps {
  cartItems: CartItem[];
  onRemoveItem: (productName: string) => void;
  onConfirmOrder: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemoveItem, onConfirmOrder }) => {
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className='bg-white rounded-2xl p-6 shadow-sm'>
      <h2 className='text-2xl font-bold text-[var(--Red)] mb-6'>
        Your Cart ({totalCount})
      </h2>

      {cartItems.length === 0 ? (
        <p className='text-center text-[var(--Rose-500)] py-8 font-semibold text-sm'>
          Your added items will appear here
        </p>
      ) : (
        <div className='flex flex-col gap-4'>
          {cartItems.map((item) => (
            <div 
            key={item.name} 
            className='flex justify-between items-center border-b border-[var(--Rose-100)] pb-4'
            >
              <div>
                <h3 className='text-sm font-semibold text-[var(--Rose-900)]'>{item.name}
                </h3>
                <div className='flex gap-3 text-sm mt-1'>
                  <span className='font-bold text-[var(--Red)]'>{item.quantity}x</span>
                  <span className='text-[var(--Rose-400)]'>@ ${item.price.toFixed(2)}</span>
                  <span className='font-semibold text-[var(--Rose-500)]'>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <button 
              onClick={() => onRemoveItem(item.name)} 
              aria-label='Remove item'
              >
                <IoMdCloseCircleOutline className='text-xl text-[var(--Rose-400)] hover:text-[var(--Rose-900)] transition-colors' />
              </button>
            </div>
          ))}

          <div className='flex justify-between items-center my-4'>
            <span className='text-sm text-[var(--Rose-900)]'>Order Total</span>
            <span className='text-2xl font-bold text-[var(--Rose-900)]'>
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <button
            onClick={onConfirmOrder}
            className='w-full bg-[var(--Red)] text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity'
          >
            Confirm Order
          </button>
        </div>
      )}
    </section>
  );
};

export default Cart;