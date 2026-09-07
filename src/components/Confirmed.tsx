import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MessageCircle, RefreshCw } from 'lucide-react';
import type { CartItem } from '../types/product';

interface ConfirmedProps {
  isOpen: boolean;
  cart: CartItem[];
  onNewOrder: () => void;
}

export const Confirmed: React.FC<ConfirmedProps> = ({ isOpen, cart, onNewOrder }) => {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Formats cart into a WhatsApp checkout string
  const handleWhatsAppOrder = () => {
    const orderDetails = cart
      .map((item) => `• ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`)
      .join('%0A');
    
    const message = `Hello Velvet %26 Vanilla! 🧁%0AI would like to place an order:%0A%0A${orderDetails}%0A%0A*Total Amount: $${totalAmount.toFixed(2)}*`;
    window.open(`https://wa.me/2349063392734?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white rounded-t-2xl sm:rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-amber-950">Order Confirmed</h2>
          <p className="text-sm text-stone-500 mb-6">We hope you enjoy your gourmet pastries!</p>

          {/* Cart Item Summary */}
          <div className="bg-amber-50/50 rounded-xl p-4 space-y-3 mb-6 border border-amber-100/80">
            {cart.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm pb-2 border-b border-amber-100/60 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={item.image.thumbnail} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold text-stone-800">{item.name}</p>
                    <p className="text-xs text-stone-500">
                      <span className="text-rose-600 font-bold mr-2">{item.quantity}x</span> @ ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-stone-800">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between">
              <span className="text-sm font-medium text-stone-600">Order Total</span>
              <span className="text-xl font-bold text-amber-950">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Business Call-to-Actions */}
          <div className="space-y-3">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Send Order via WhatsApp
            </button>

            <button
              onClick={onNewOrder}
              className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-full flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Start New Order
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};