import React from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../types/product';

interface CartProps {
  cart: CartItem[];
  onRemoveItem: (name: string) => void;
  onClearCart?: () => void; // Optional handler to wipe the full cart
  onConfirmOrder: () => void;
}

export const Cart: React.FC<CartProps> = ({
  cart,
  onRemoveItem,
  onClearCart,
  onConfirmOrder,
}) => {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
      {/* Header with Clear All Action */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold text-rose-600">
          Your Cart ({totalCount})
        </h2>

        {/* Clear All Icon Button (Only active when cart has items) */}
        {cart.length > 0 && onClearCart && (
          <button
            onClick={onClearCart}
            title="Clear all items"
            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <ShoppingBag className="w-8 h-8 text-amber-800/40" />
          </div>
          <p className="text-xs font-semibold text-stone-500">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Item List */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between pb-3 border-b border-stone-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-semibold text-stone-800">{item.name}</p>
                  <div className="flex items-center gap-2 text-xs mt-0.5">
                    <span className="text-rose-600 font-bold">{item.quantity}x</span>
                    <span className="text-stone-400">@ ${item.price.toFixed(2)}</span>
                    <span className="text-stone-600 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.name)}
                  className="p-1 text-stone-300 hover:text-stone-600 rounded-full border border-stone-200 hover:border-stone-400 transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <span className="text-xs block w-3.5 h-3.5 leading-tight text-center font-bold">×</span>
                </button>
              </div>
            ))}
          </div>

          {/* Total & Confirm Button */}
          <div className="pt-4 border-t border-stone-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500 font-medium">Order Total</span>
              <span className="text-2xl font-bold text-stone-900">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={onConfirmOrder}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm rounded-full transition-all shadow-sm active:scale-[0.99]"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};