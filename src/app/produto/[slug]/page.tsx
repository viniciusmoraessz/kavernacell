import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { catalogProducts } from '@/data/catalog';
import { getProductDetails } from '@/data/product-details';
import { categoryHref, categoryLabel } from '@/lib/categories';
import ProductExperience from '@/components/product/ProductExperience';
import ProductCard from '@/components/ui/ProductCard';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return catalogProducts.map(product => ({ slug: product.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = catalogProducts.find(item => item.id === slug);
  if (!product) return { title: 'Produto não encontrado | Kaverna Cell' };
  const details = getProductDetails(product);
  return {
    title: `${product.name} | Kaverna Cell`,
    description: `Explore ${product.name} e consulte opções, disponibilidade e valores com a Kaverna Cell.`,
    openGraph: { title: `${product.name} | Kaverna Cell`, description: details.tagline, images: [{ url: details.gallery[0].src, alt: details.gallery[0].alt }] },
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = catalogProducts.find(item => item.id === slug);
  if (!product) notFound();
  const details = getProductDetails(product);
  const related = catalogProducts.filter(item => item.category === product.category && item.id !== product.id).slice(0, 3);
  return <main id="conteudo" className="product-page">
    <div className="shell">
      <nav className="product-breadcrumb" aria-label="Navegação do produto"><Link href={categoryHref(product.category)}><ArrowLeft size={16}/> Voltar para {categoryLabel(product.category)}</Link><span>{product.name}</span></nav>
      <ProductExperience key={product.id} product={details}/>
    </div>
    <section className="product-features"><div className="shell"><div className="eyebrow">FEITO PARA A SUA ROTINA</div><h2>Conheça a sua próxima escolha.</h2><div className="feature-grid">{details.features.map((feature, index) => <article key={feature.title}><span>0{index + 1}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div></div></section>
    {related.length > 0 && <section className="related-products section"><div className="shell"><div className="section-heading"><div><div className="eyebrow yellow">CONTINUE EXPLORANDO</div><h2>Outras possibilidades.</h2></div><Link href={categoryHref(product.category)} className="text-action">VER CATEGORIA <ArrowUpRight size={18}/></Link></div><div className="product-grid">{related.map(item => <ProductCard key={item.id} product={item}/>)}</div></div></section>}
  </main>;
}
