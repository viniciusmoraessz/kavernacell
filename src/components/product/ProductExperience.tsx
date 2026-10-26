'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Check, Maximize2, ShieldCheck } from 'lucide-react';
import type { ProductDetails } from '@/types/product';
import WhatsAppLink, { WhatsAppIcon } from '@/components/ui/WhatsAppLink';
import GalleryLightbox from './GalleryLightbox';
import { demoIphonePrices, demoPriceLabel, type PhoneCondition } from '@/data/iphone-pricing';

export default function ProductExperience({ product }: { product: ProductDetails }) {
  const [colorId, setColorId] = useState(product.colors.find(option => option.name.toLowerCase() === product.color?.toLowerCase())?.id ?? product.colors[0]?.id);
  const [imageIndex, setImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [condition, setCondition] = useState<PhoneCondition>('lacrado');
  const [configuration, setConfiguration] = useState<Record<string, string>>(
    Object.fromEntries(product.configurations.filter(group => group.options.length).map(group => [group.id, group.options[0]])),
  );
  const color = product.colors.find(option => option.id === colorId);
  const images = color?.images?.length ? color.images : product.gallery;
  const currentImage = images[imageIndex] ?? images[0];
  const prices = product.category === 'iPhone' ? demoIphonePrices[product.id] : undefined;
  const selectedStorage = configuration.storage ?? Object.keys(prices?.[condition] ?? {})[0];
  const choices = [condition === 'lacrado' ? 'Lacrado' : 'Usado', color?.name, ...Object.entries(configuration).filter(([key]) => key !== 'storage').map(([, value]) => value), selectedStorage].filter(Boolean).join(' · ');
  const selectedPrice = selectedStorage ? prices?.[condition][selectedStorage] : undefined;
  const message = `Olá, Kaverna Cell! Quero consultar ${product.name}${choices ? ` (${choices})` : ''}${selectedPrice ? ` — valor demonstrativo exibido: ${demoPriceLabel(selectedPrice)}` : ''}. Sei que valores do site são fictícios; podem confirmar preço, estado, configuração e disponibilidade reais?`;

  return <div className="product-experience">
    <div className="product-gallery">
      <div className="gallery-stage">
        <span className="gallery-overline">KAVERNA CELL / EXPLORE</span>
        <button type="button" className="gallery-zoom" onClick={() => setLightboxOpen(true)} aria-label={`Ampliar imagem de ${product.name}`}>
          <Image key={currentImage.src} src={currentImage.src} alt={currentImage.alt} fill priority sizes="(max-width: 900px) 95vw, 55vw" className="image-enter"/>
          <span className="zoom-hint"><Maximize2 size={16}/> Ampliar imagem</span>
        </button>
      </div>
      <div className="gallery-meta"><p aria-live="polite">{currentImage.label}</p><span>{imageIndex + 1} / {images.length}</span></div>
      {images.length > 1 && <div className="gallery-thumbnails" aria-label="Imagens do produto">
        {images.map((image, index) => <button key={image.src} type="button" aria-label={`Ver ${image.label}`} aria-pressed={imageIndex === index} onClick={() => setImageIndex(index)}><Image src={image.src} alt="" width={96} height={80}/></button>)}
      </div>}
      <p className="reference-note">{product.referenceNote}</p>
    </div>

    <div className="product-selection">
      <div className="eyebrow cyan">SEU PRÓXIMO COMEÇA AQUI</div>
      <h1>{product.name}</h1>
      <p className="product-tagline">{product.tagline}</p>
      <p className="product-description">{product.description}</p>

      {product.category === 'iPhone' && <fieldset className="selection-group condition-group"><legend>Condição do aparelho <span>{condition === 'lacrado' ? 'Lacrado' : 'Usado'}</span></legend><div className="configuration-options">{(['lacrado', 'usado'] as const).map(option => <button type="button" key={option} aria-pressed={condition === option} onClick={() => { setCondition(option); const nextPrices = demoIphonePrices[product.id]?.[option]; if (nextPrices && !nextPrices[configuration.storage]) setConfiguration(previous => ({ ...previous, storage: Object.keys(nextPrices)[0] })); }}>{option === 'lacrado' ? 'Lacrado' : 'Usado'}</button>)}</div><p className="selection-note">{condition === 'usado' ? 'Estado de conservação, saúde da bateria e garantia variam por aparelho e precisam ser confirmados.' : 'A condição lacrada e os detalhes do produto devem ser confirmados com a loja.'}</p></fieldset>}

      <fieldset className="selection-group"><legend>Acabamento <span>{color?.name ?? 'Sob consulta'}</span></legend>
        {product.colors.length ? <div className="color-options">{product.colors.map(option => <button type="button" key={option.id} className="color-option" aria-label={`Cor ${option.name}`} aria-pressed={colorId === option.id} onClick={() => { setColorId(option.id); setImageIndex(0); }}><span style={{ backgroundColor: option.swatch }}>{colorId === option.id && <Check size={16}/>}</span><small>{option.name}</small></button>)}</div> : <p className="selection-note">As cores desta família ainda não estão cadastradas. Consulte a equipe.</p>}
        {color && !color.images?.length && <p className="selection-note">Cor selecionada: {color.name}. Foto específica indisponível; exibimos a imagem de referência do produto.</p>}
      </fieldset>

      {product.configurations.length ? product.configurations.map(group => <fieldset className="selection-group" key={group.id}><legend>{group.label}</legend>{group.options.length ? <div className="configuration-options">{group.options.map(option => <button type="button" key={option} aria-pressed={configuration[group.id] === option} onClick={() => setConfiguration(previous => ({ ...previous, [group.id]: option }))}>{option}{configuration[group.id] === option && <Check size={14}/>}</button>)}</div> : <p className="selection-note">Opções ainda não cadastradas. Consulte a equipe.</p>}</fieldset>) : <div className="selection-group"><h2>Configuração</h2><p className="selection-note">Configurações ainda não cadastradas. A equipe confirma geração, capacidades e compatibilidade para você.</p></div>}

      <div className="selection-summary" aria-live="polite"><span>SUA SELEÇÃO PARA CONSULTA</span><strong>{product.name}{choices && ` · ${choices}`}</strong><p>Opções demonstrativas. A seleção não confirma estoque ou condição.</p></div>
      <div className="product-price">{selectedPrice ? <><span className="demo-price-label">PREÇO FICTÍCIO · DEMONSTRAÇÃO</span><strong>{demoPriceLabel(selectedPrice)}</strong><small>Valor de exemplo, sem validade comercial. Confirme preço e disponibilidade com a loja.</small></> : <><strong>Preço ilustrativo ainda não cadastrado</strong><small>Consulte a loja para conhecer opções e valores reais.</small></>}</div>
      <WhatsAppLink className="btn btn-primary product-consult" message={message}><WhatsAppIcon/> CONSULTAR PELO WHATSAPP <ArrowUpRight size={18}/></WhatsAppLink>
      <p className="product-assurance"><ShieldCheck size={17}/> Detalhes e garantia informados com transparência.</p>
    </div>
    {lightboxOpen && <GalleryLightbox images={images} index={imageIndex} name={product.name} onIndexChange={setImageIndex} onDismiss={() => setLightboxOpen(false)}/>}
  </div>;
}
