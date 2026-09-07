import React from 'react';
import type { CartItem } from '../types/product';
import { getImageUrl } from '../utils/getImageUrl';
import { SiTicktick } from "react-icons/si";

interface OrderModalProps {
  isOpen: boolean;
  cartItems: CartItem[];
  totalPrice: number;
  onResetOrder: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen, 
  cartItems, 
  totalPrice,
  onResetOrder
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4'>
      <div className='w-full max-w-md rounded-t-2xl sm:rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto'>
        <div className='mb-4'>
          <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 text-2xl font-bold mb-3'>
            <SiTicktick />
          </span>
          <h2 className='text-3xl font-bold text-[var(--Rose-900)]'>Order Confirmed</h2>
          <p className='text-sm text-[var(--Rose-500)] mt-1'>We hope you enjoy your food!</p>
        </div>

        <div className='rounded-lg bg-[var(--Rose-50)] p-4 my-6'>
          {cartItems.map((item) => (
            <div
              key={item.name}
              className='flex items-center justify-between border-b border-[var(--Rose-100)] py-3 last:border-b-0'
            >
              <div className='flex items-center gap-3'>
                <img
                  src={getImageUrl(item.image.thumbnail)}
                  alt={item.name}
                  className='h-12 w-12 rounded-md object-cover'
                />
                <div>
                  <h4 className='text-sm font-semibold text-[var(--Rose-900)] truncate max-w-[150px]'>
                    {item.name}
                  </h4>
                  <p className='text-sm text-[var(--Red)] font-semibold'>
                    {item.quantity}x{' '}
                    <span className='text-[var(--Rose-400)] font-normal ml-2'>
                      @ ${item.price.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
              <span className='font-semibold text-[var(--Rose-900)]'>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className='flex justify-between items-center pt-4 mt-2'>
            <span className='text-sm text-[var(--Rose-900)]'>Order Total</span>
            <span className='text-2xl font-bold text-[var(--Rose-900)]'>
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={onResetOrder}
          className='w-full rounded-full bg-[var(--Red)] py-3 font-semibold text-white hover:bg-[#a93312] transition-colors'
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default OrderModal;