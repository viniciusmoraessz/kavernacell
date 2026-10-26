'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ProductImage } from '@/types/product';

interface Props {
  images: ProductImage[];
  index: number;
  name: string;
  onIndexChange: (index: number) => void;
  onDismiss: () => void;
}

export default function GalleryLightbox({ images, index, name, onIndexChange, onDismiss }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [closing, setClosing] = useState(false);
  const image = images[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog?.showModal();
    return () => {
      if (timer.current) clearTimeout(timer.current);
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  function close() {
    if (closing) return;
    setClosing(true);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) onDismiss();
    else timer.current = setTimeout(onDismiss, 160);
  }
  function move(direction: number) {
    onIndexChange((index + direction + images.length) % images.length);
  }

  return <dialog
    ref={dialogRef}
    className={`gallery-lightbox ${closing ? 'is-closing' : ''}`}
    aria-labelledby="gallery-title"
    aria-describedby="gallery-help"
    onCancel={event => { event.preventDefault(); close(); }}
    onClick={event => { if (event.target === event.currentTarget) close(); }}
    onKeyDown={event => {
      if (event.key === 'Tab') {
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    }}
  >
    <div className="lightbox-header"><div><span className="eyebrow">EXPLORE CADA DETALHE</span><h2 id="gallery-title">{name}</h2></div><button type="button" className="icon-button" aria-label="Fechar galeria" onClick={close}><X/></button></div>
    <div className="lightbox-image"><Image key={image.src} src={image.src} alt={image.alt} fill sizes="95vw" className="image-enter"/></div>
    <div className="lightbox-footer">
      <p aria-live="polite">{image.label} <span>· {index + 1} / {images.length}</span></p>
      {images.length > 1 && <div className="gallery-arrows"><button type="button" className="icon-button" aria-label="Imagem anterior" onClick={() => move(-1)}><ChevronLeft/></button><button type="button" className="icon-button" aria-label="Próxima imagem" onClick={() => move(1)}><ChevronRight/></button></div>}
    </div>
    <p id="gallery-help" className="gallery-help">Escape para fechar{images.length > 1 ? ' · Use as setas do teclado para navegar' : ''}.</p>
  </dialog>;
}
