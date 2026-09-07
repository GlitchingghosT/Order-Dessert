import React from 'react';
import type { CartItem } from '../types/product';
import { getImageUrl } from '../utils/getImageUrl';

interface OrderModalProps {
  isOpen: boolean;
  cartItems: CartItem[];
  totalPrice: number;
  onResetOrder: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, cartItems, totalPrice, onResetOrder }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-xl'>
        <h2 className='text-3xl font-bold text-[var(--Rose-900)]'>Order Confirmed</h2>
        <p className='text-sm text-[var(--Rose-500)] mb-4'>We hope you enjoy your food!</p>

        {/* Order Items Summary Box */}
        <div className='rounded-lg bg-[var(--Rose-50)] p-4 max-h-60 overflow-y-auto'>
          {cartItems.map((item) => (
            <div key={item.name} className='flex items-center justify-between border-b border-[var(--Rose-100)] py-3 last:border-b-0'>
              <div className='flex items-center gap-3'>
                <img src={getImageUrl(item.image.thumbnail)} alt={item.name} className='h-12 w-12 rounded-md object-cover' />
                <div>
                  <h4 className='text-sm font-semibold text-[var(--Rose-900)] truncate max-w-[140px]'>{item.name}</h4>
                  <p className='text-sm text-[var(--Red)] font-semibold'>
                    {item.quantity}x <span className='text-[var(--Rose-400)] font-normal ml-2'>@ ${item.price.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              <span className='font-semibold text-[var(--Rose-900)]'>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className='flex justify-between items-center pt-4'>
            <span className='text-sm text-[var(--Rose-900)]'>Order Total</span>
            <span className='text-2xl font-bold text-[var(--Rose-900)]'>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Start New Order Action */}
        <button
          onClick={onResetOrder}
          className='mt-6 w-full rounded-full bg-[var(--Red)] py-3 font-semibold text-white transition-opacity hover:opacity-90'
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default OrderModal;