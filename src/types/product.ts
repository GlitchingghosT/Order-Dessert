export interface ProductImage {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
    
}

export interface Product {
    name: string;
    category: string;
    image: ProductImage;
    price: number;
}

export interface CartItem extends Product {
  quantity: number;
}