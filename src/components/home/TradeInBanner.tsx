import Image from 'next/image';
import { CheckCircle2, Smartphone } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { sectionFont } from '@/lib/section-font';

export default function TradeInBanner() {
  return <section className={`trade trade-redesign ${sectionFont.className}`} aria-labelledby="trade-title">
    <div className="shell">
      <div className="trade-redesign-grid">
        <Reveal className="trade-showcase">
          <div className="trade-disc" aria-hidden="true" />
          <Image className="trade-device trade-device-back trade-float" src="/images/iphone-16.png" alt="iPhone azul visto de frente e de traseira" width={800} height={1000} sizes="(max-width: 760px) 70vw, 34vw" priority />
          <Image className="trade-device trade-device-front trade-float" src="/images/iphone-pro.png" alt="iPhone Pro em tom natural visto de frente e de traseira" width={800} height={1000} sizes="(max-width: 760px) 70vw, 34vw" />
          <div className="trade-seal trade-seal-light"><Smartphone size={18} aria-hidden="true" /><span>Avaliação gratuita do seu aparelho usado</span></div>
          <div className="trade-seal trade-seal-blue"><CheckCircle2 size={18} aria-hidden="true" /><span>Condições de garantia informadas com clareza</span></div>
        </Reveal>
        <Reveal className="trade-copy trade-copy-redesign">
          <div className="eyebrow"><span />NOVO IPHONE. NOVAS POSSIBILIDADES.</div>
          <h2 id="trade-title">SEU USADO VALE MAIS NA KAVERNA CELL.</h2>
          <p>Troque seu iPhone atual e use o valor na compra do próximo. Você manda o modelo, a gente avalia e apresenta a melhor condição, sem enrolação.</p>
        </Reveal>
      </div>
    </div>
  </section>;
}
