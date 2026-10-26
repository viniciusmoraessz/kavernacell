import type { ProductCategory } from '@/types/product';

export const categorySlugs: Record<ProductCategory, string> = {
  iPhone: 'iphone', Mac: 'mac', 'Áudio': 'airpods', 'Apple Watch': 'apple-watch',
  iPad: 'ipad', 'Acessórios': 'acessorios',
};
export function categoryLabel(category: ProductCategory) {
  return category === 'Áudio' ? 'AirPods' : category;
}
export function categoryHref(category: ProductCategory) {
  return `/#catalogo-${categorySlugs[category]}`;
}
export function categoryFromHash(hash: string): ProductCategory {
  return (Object.entries(categorySlugs).find(([, slug]) => hash === `#catalogo-${slug}`)?.[0] as ProductCategory) ?? 'iPhone';
}
