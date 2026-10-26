export type ProductCategory = 'iPhone' | 'Mac' | 'Áudio' | 'Apple Watch' | 'iPad' | 'Acessórios';
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  detail: string;
  color?: string;
  swatch?: string;
  image?: string;
  icon: 'phone' | 'laptop' | 'audio' | 'watch' | 'tablet' | 'accessory';
}

export interface ProductImage { src: string; alt: string; label: string }
export interface ProductColor { id: string; name: string; swatch: string; images?: ProductImage[] }
export interface ProductOption { id: string; label: string; options: string[] }
export interface ProductDetails extends Product {
  tagline: string;
  description: string;
  features: { title: string; description: string }[];
  gallery: ProductImage[];
  colors: ProductColor[];
  configurations: ProductOption[];
  referenceNote: string;
}
