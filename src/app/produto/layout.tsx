import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><Header/>{children}<Footer/></>;
}
