import { BadgeCheck, Headphones, ShieldCheck, HeartHandshake } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { sectionFont } from '@/lib/section-font';

const items = [
  { icon: BadgeCheck, title: 'Procedência em primeiro lugar', text: 'Peça informações sobre modelo, estado e procedência antes de escolher.' },
  { icon: Headphones, title: 'Gente que entende de iPhone', text: 'Atendimento de quem vive iPhone todo dia, para indicar o modelo certo para seu uso e bolso.' },
  { icon: ShieldCheck, title: 'Garantia com transparência', text: 'Consulte o prazo e as condições aplicáveis a cada aparelho antes de concluir a compra.' },
  { icon: HeartHandshake, title: 'Conte com a gente', text: 'Suporte antes e depois da compra. É só chamar no WhatsApp.' },
];

export default function Benefits() {
  return <section className={`benefits benefits-redesign ${sectionFont.className}`} aria-labelledby="benefits-title">
    <div className="shell">
      <Reveal className="benefits-intro">
        <div><div className="eyebrow"><span/>POR QUE A KAVERNA</div><h2 id="benefits-title">COMPRAR IPHONE SEM MEDO DE ERRAR.</h2></div>
        <p>Escolha com mais tranquilidade e conte com uma equipe pronta para orientar você.</p>
      </Reveal>
      <div className="benefits-grid benefits-grid-redesign">
        {items.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * 70}>
          <article className="benefit benefit-card">
            <span className="benefit-icon"><Icon size={25} aria-hidden="true"/></span>
            <h3>{title}</h3><p>{text}</p>
          </article>
        </Reveal>)}
      </div>
    </div>
  </section>;
}
