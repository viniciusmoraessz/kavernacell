'use client';
import { ArrowUpRight, Headphones, Laptop, MousePointer2, Smartphone, Tablet, Watch } from 'lucide-react';
import { catalogCategories } from '@/data/catalog';
import { categoryHref, categoryLabel } from '@/lib/categories';
import { useCatalogCategory } from '@/lib/useCatalogCategory';
const iconMap = { 'iPhone': Smartphone, 'Mac': Laptop, 'Áudio': Headphones, 'Apple Watch': Watch, 'iPad': Tablet, 'Acessórios': MousePointer2 };
export default function Categories() {
  const active = useCatalogCategory();
  return <section id="acessorios" className="categories" aria-label="Categorias do ecossistema Apple">
    <nav className="shell category-grid" aria-label="Atalhos de categorias">
      {catalogCategories.map(({ name, description }) => {
        const Icon = iconMap[name];
        return <a key={name} href={categoryHref(name)} className="category" aria-current={active === name ? 'true' : undefined}>
          <span className="category-icon"><Icon size={29}/></span><strong>{categoryLabel(name)}</strong><small>{description}</small><ArrowUpRight className="category-arrow" size={15}/>
        </a>;
      })}
    </nav>
  </section>;
}
