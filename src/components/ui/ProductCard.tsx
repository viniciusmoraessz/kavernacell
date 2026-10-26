import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/types/product';
import { getProductDetails } from '@/data/product-details';
import { categoryLabel } from '@/lib/categories';

export default function ProductCard({ product }: { product: Product }) {
  const details = getProductDetails(product);
  const mainImage = details.gallery[0];
  return (
    <article className="product-card">
      <Link href={`/produto/${product.id}`} className="product-explore" aria-label={`Explorar ${product.name}`}>
        <div className="product-top"><span>{categoryLabel(product.category)}</span><ArrowUpRight size={15}/></div>
        <div className={`product-image ${product.category !== 'iPhone' ? 'product-image-wide' : ''}`}>
          <Image src={mainImage.src} alt={mainImage.alt} width={1000} height={1000} sizes="(max-width: 760px) 45vw, 25vw"/>
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="card-detail">{details.tagline}</p>
          <p>Consulte disponibilidade e valor</p>
          <span className="btn btn-primary">EXPLORAR PRODUTO <ArrowUpRight size={17}/></span>
        </div>
      </Link>
    </article>
  );
}
