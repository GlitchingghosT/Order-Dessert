import React from 'react';
import Product from './Product';
import type { CartItem, Product as ProductType } from '../types/product';

interface ProductGridProps {
  products: ProductType[];
  cartItems: CartItem[];
  onUpdateQuantity: (product: ProductType, quantity: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  cartItems,
  onUpdateQuantity,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
      {products.map((product) => {
        const itemInCart = cartItems.find((item) => item.name === product.name);
        const quantity = itemInCart ? itemInCart.quantity : 0;

        return (
          <Product
            key={product.name}
            product={product}
            quantity={quantity}
            onUpdateQuantity={onUpdateQuantity}
          />
        );
      })}
    </div>
  );
};