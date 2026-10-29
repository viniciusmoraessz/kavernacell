import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TradeInBanner from '@/components/home/TradeInBanner';
import Benefits from '@/components/home/Benefits';
import About from '@/components/home/About';
import FinalCTA from '@/components/home/FinalCTA';
export default function Home(){return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header/><main id="conteudo"><Hero/><Categories/><FeaturedProducts/><TradeInBanner/><Benefits/><About/><FinalCTA/></main><Footer/></>}
