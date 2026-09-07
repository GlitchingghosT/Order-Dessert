import React from 'react';
import Product from './Product';
import data from "../data.json" 
import type { CartItem, Product as ProductType } from '../types/product';

interface ProductGridProps {
cartItems: CartItem[];
onUpdateQuantity: (product: ProductType, quantity: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ cartItems, onUpdateQuantity}) => {

  return (
    <main className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8'>
        {data.map((product) => {
          const itemInCart =cartItems.find((item) => item.name === product.name);
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
    </main>
  );
};

export default ProductGrid