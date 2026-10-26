import Image from 'next/image';
import { BadgeCheck, PackageCheck, Smartphone } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { sectionFont } from '@/lib/section-font';

const choices = [
  { icon: Smartphone, title: 'Aparelhos lacrados', text: 'Consulte os modelos disponíveis e confirme as condições do aparelho com a equipe.' },
  { icon: BadgeCheck, title: 'Seminovos sob consulta', text: 'Peça informações sobre estado, revisão e garantia do aparelho oferecido.' },
  { icon: PackageCheck, title: 'Acessórios', text: 'Capas, películas e carregadores certos pro seu modelo.' },
];

export default function About() {
  return <section id="sobre" className={`about about-redesign ${sectionFont.className}`} aria-labelledby="about-title">
    <div className="shell about-grid about-grid-redesign">
      <Reveal className="about-mark about-product-stage" aria-label="Três iPhones em cores diferentes">
        <span className="about-product-orbit" aria-hidden="true" />
        <Image className="about-phone about-phone-left" src="/images/iphone-15.png" alt="iPhone em acabamento rosa" width={800} height={1000} sizes="(max-width: 760px) 28vw, 15vw" />
        <Image className="about-phone about-phone-right" src="/images/iphone-pro.png" alt="iPhone Pro em acabamento natural" width={800} height={1000} sizes="(max-width: 760px) 28vw, 15vw" />
        <Image className="about-phone about-phone-center" src="/images/iphone-16.png" alt="iPhone em acabamento azul" width={800} height={1000} sizes="(max-width: 760px) 36vw, 19vw" priority />
        <span className="about-promise">SEU PRÓXIMO<br /><strong>COMEÇA AQUI.</strong></span>
      </Reveal>
      <Reveal className="about-content">
        <div className="eyebrow"><span />MUITO ALÉM DE UM APARELHO</div>
        <h2 id="about-title">TECNOLOGIA E CONFIANÇA NA ESCOLHA DO SEU PRÓXIMO IPHONE.</h2>
        <p>Um iPhone pra trabalhar, criar, se conectar e registrar o que importa. Na Kaverna Cell você escolhe com orientação de quem entende e leva o modelo que faz sentido pra sua rotina.</p>
        <div className="about-choices">
          {choices.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * 65}>
            <article className="about-choice"><span className="about-choice-icon"><Icon size={20} aria-hidden="true" /></span><span><strong>{title}</strong><small>{text}</small></span></article>
          </Reveal>)}
        </div>
      </Reveal>
    </div>
  </section>;
}
