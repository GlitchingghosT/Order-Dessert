import React from 'react';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import type { CartItem } from '../types/product';

interface CartProps {
  cart: CartItem[];
  onRemoveItem: (name: string) => void;
  onConfirmOrder: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemoveItem, onConfirmOrder }) => {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/80 mt-10 md:mt-0">
      <h2 className="font-serif text-2xl font-bold text-rose-700 mb-6 flex items-center justify-between">
        <span>Your Cart</span>
        <span className="text-sm font-sans font-semibold bg-rose-100 text-rose-800 px-3 py-0.5 rounded-full">
          {totalCount}
        </span>
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-10 space-y-3">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-700">
            <ShoppingBag className="w-8 h-8 opacity-60" />
          </div>
          <p className="text-sm font-semibold text-stone-600">Your cart is empty</p>
          <p className="text-xs text-stone-400 max-w-[200px] mx-auto">
            Your added items will appear here. Start choosing your desserts!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <ul className="divide-y divide-stone-100 max-h-[360px] overflow-y-auto pr-1">
            {cart.map((item) => (
              <li key={item.name} className="py-3 flex items-center justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-stone-800 line-clamp-1">{item.name}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-rose-600 font-bold">{item.quantity}x</span>
                    <span className="text-stone-400">@ ${item.price.toFixed(2)}</span>
                    <span className="text-stone-600 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.name)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-stone-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-500 font-medium">Order Total</span>
              <span className="text-2xl font-bold text-stone-900">${totalAmount.toFixed(2)}</span>
            </div>

            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-100/60 flex items-center gap-2 text-xs text-amber-900">
              <span className="text-base">🌱</span>
              <span>This is a <strong>carbon-neutral</strong> delivery</span>
            </div>

            <button
              onClick={onConfirmOrder}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-rose-200 transition-all active:scale-[0.98]"
            >
              <span>Confirm Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { Cart };