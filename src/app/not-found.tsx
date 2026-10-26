import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return <main id="conteudo" className="not-found"><div className="shell"><SearchX size={48}/><div className="eyebrow cyan">404 · PRODUTO NÃO ENCONTRADO</div><h1>Vamos encontrar<br/>sua próxima escolha?</h1><p>Este endereço não corresponde a um produto do catálogo.</p><Link className="btn btn-primary" href="/#iphones"><ArrowLeft size={18}/> VOLTAR AO CATÁLOGO</Link></div></main>;
}
