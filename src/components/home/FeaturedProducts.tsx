'use client';
import { ArrowUpRight } from 'lucide-react';
import { catalogProducts } from '@/data/catalog';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import ProductCard from '@/components/ui/ProductCard';
import { categoryLabel, categorySlugs } from '@/lib/categories';
import { useCatalogCategory } from '@/lib/useCatalogCategory';

export default function FeaturedProducts() {
  const activeCategory = useCatalogCategory();
  const visibleProducts = catalogProducts.filter(product => product.category === activeCategory);
  return (
    <section id="iphones" className="products section catalog-section">
      {Object.values(categorySlugs).map(slug => <span key={slug} id={`catalogo-${slug}`} className="catalog-anchor" aria-hidden="true"/>)}
      <div className="shell">
        <div className="section-heading"><div><div className="eyebrow yellow">EXPLORE O ECOSSISTEMA APPLE</div><h2>TECNOLOGIA<br/><em>PARA CADA MOMENTO.</em></h2></div><p>Modelos e acessórios para trabalhar, criar, se conectar e aproveitar cada detalhe da sua rotina.</p></div>
        <p className="catalog-count" role="status">{categoryLabel(activeCategory)} · {visibleProducts.length} produtos para explorar</p>
        <div className="product-grid" key={activeCategory}>{visibleProducts.map(product => <ProductCard key={product.id} product={product}/>)}</div>
        <div className="catalog-bottom"><p>Catálogo ilustrativo. Consulte modelos, variantes e disponibilidade com a equipe.</p><WhatsAppLink className="text-action">FALAR SOBRE O CATÁLOGO <ArrowUpRight size={18}/></WhatsAppLink></div>
      </div>
    </section>
  );
}
