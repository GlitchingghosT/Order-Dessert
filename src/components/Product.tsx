import React from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import type { Product as ProductType } from '../types/product';

interface ProductProps {
  product: ProductType;
  quantity: number;
  onUpdateQuantity: (product: ProductType, quantity: number) => void;
}

export const Product: React.FC<ProductProps> = ({
  product,
  quantity,
  onUpdateQuantity,
}) => {
  return (
    <div className="flex flex-col">
      {/* Image Container */}
      <div className="relative mb-8">
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 640px)" srcSet={product.image.tablet} />
          <source media="(max-width: 639px)" srcSet={product.image.mobile} />
          <img
            src={product.image.thumbnail}
            alt={product.name}
            className={`w-full h-60 object-cover rounded-xl shadow-sm transition-all duration-200 ${
              quantity > 0 ? 'ring-2 ring-rose-600' : ''
            }`}
          />
        </picture>

        {/* Add to Cart / Quantity Pill Button */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-40">
          {quantity === 0 ? (
            <button
              onClick={() => onUpdateQuantity(product, 1)}
              className="w-full py-2.5 px-4 bg-white hover:border-rose-600 hover:text-rose-600 text-stone-800 font-semibold text-xs rounded-full border border-stone-300 flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
            >
              <ShoppingCart className="w-4 h-4 text-rose-600" />
              Add to Cart
            </button>
          ) : (
            <div className="w-full py-2 px-3 bg-rose-600 text-white font-semibold text-xs rounded-full flex items-center justify-between shadow-sm">
              <button
                onClick={() => onUpdateQuantity(product, quantity - 1)}
                className="w-5 h-5 rounded-full border border-white flex items-center justify-center hover:bg-rose-700 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3 text-white" />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => onUpdateQuantity(product, quantity + 1)}
                className="w-5 h-5 rounded-full border border-white flex items-center justify-center hover:bg-rose-700 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-1">
        <span className="text-xs text-stone-400 font-medium">{product.category}</span>
        <h3 className="text-sm font-semibold text-stone-800">{product.name}</h3>
        <p className="text-sm font-bold text-rose-600">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};