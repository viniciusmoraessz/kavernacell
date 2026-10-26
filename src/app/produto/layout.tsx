import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><Header/>{children}<Footer/><WhatsAppButton/></>;
}
