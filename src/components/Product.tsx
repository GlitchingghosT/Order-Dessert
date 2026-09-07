import React from 'react';
import type { Product as ProductType } from "../types/product"
import { getImageUrl } from "../utils/getImageUrl"
import { PiMinusCircleBold, PiPlusCircleBold } from "react-icons/pi";
import { MdOutlineAddShoppingCart } from "react-icons/md";

interface ProductProps {
    product: ProductType;
    quantity: number;
    onUpdateQuantity: (product: ProductType, quantity: number) => void;
}

const Product: React.FC<ProductProps> = ({ product, quantity, onUpdateQuantity }) => {

    const isSelected = quantity > 0;
    
  return (
    <main className='flex flex-col'>
        <div className='relative'>
            <div
             className={`overflow-hidden rounded-xl border-2 transition-colors ${
                isSelected ? "border-[var(--Red)] " : "border-transparent"
            }`}>
                <picture>
                    <source media='(min-width: 1024px)' srcSet={getImageUrl(product.image.desktop)} />
                    <source media='(min-width: 768px)' srcSet={getImageUrl(product.image.tablet)} />
                    <img
                        src={getImageUrl(product.image.mobile)} 
                        alt={product.name}
                        className='w-full object-cover block' />
                </picture>
            </div>
                <div className='absolute -bottom-6.5 md:-bottom-5 left-1/2 -translate-x-1/2 max-w-50 md:max-w-38 w-full'>
                    {!isSelected ? (
                        <button 
                        onClick={() => onUpdateQuantity(product, 1)}
                        className='w-full flex items-center justify-center gap-2 bg-[var(--Rose-50)] border border-[var(--Rose-900)] text-[var(--Rose-900)] font-semibold py-4 md:py-2.75 px-2 rounded-full shadow-md hover:text-[var(--Red)] hover:border-[var(--Red)] transition-colors '
                        >
                            <MdOutlineAddShoppingCart className='text-[var(--Red)] text-2xl md:text-lg ' />
                            <span className='text-xl md:text-sm font-semibold '> 
                                Add to Cart
                            </span>
                        </button>
                    ) : (
                        <div className='w-full flex items-center justify-between bg-[var(--Red)] text-[var(--Rose-50)] py-4 md:py-2.5 px-2 rounded-full shadow-md '>
                            <button
                                onClick={() => onUpdateQuantity(product, Math.max(0, quantity - 1))}
                                aria-label='Decrease quantity'
                                className='flex items-center justify-center'
                            >
                                <PiMinusCircleBold className='text-3xl md:text-xl hover:scale-110 text-[var(--Rose-50)] transition-transform ' />
                            </button >
                                <span className='text-xl md:text-base font-semibold text-[var(--Rose-50)] '>{quantity}</span>
                                <button
                                onClick={() => onUpdateQuantity(product, quantity + 1)}
                                aria-label='Increase quantity'
                                className='flex items-center justify-center'
                                >
                                <PiPlusCircleBold className='text-3xl md:text-xl hover:scale-110 text-[var(--Rose-50)] transition-transform ' />
                                </button>
                        </div>
                    )}
                </div>
        </div>
            <div className='mt-9 flex flex-col gap-0 items-start'>
                <p className='text-lg md:text-sm font-medium text-[var(--Rose-400)]'>{product.category}</p>
                <h3 className='text-xl md:text-base font-semibold text-[var(--Rose-900)] '>{product.name}</h3>
                <p className='text-xl md:text-base font-semibold text-[var(--Red)]'>${product.price.toFixed(2)}</p>
            </div>
    </main>
  );
};

export default Product