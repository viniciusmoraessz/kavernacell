'use client';
import { useRef, useId, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { whatsappUrl } from '@/lib/utils';
export function WhatsAppIcon({size = 20}: {size?: number}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8a8.5 8.5 0 1 1 16.2-4Z M8.2 7.3c-.8.4-.9 1.5-.5 2.5 1.1 2.7 3 4.6 5.8 5.5 1 .4 2.1.1 2.6-.8l.4-1-2.5-1.2-1 1c-1.4-.6-2.5-1.7-3.1-3.1l.8-1-1.2-2.4Z"/></svg>;
}
export default function WhatsAppLink({children, message, className = '', label}: {children: ReactNode; message?: string; className?: string; label?: string}) {
  const dialog = useRef<HTMLDialogElement>(null); const titleId = useId();
  const url = whatsappUrl(message);
  if (url) return <a className={className} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}</a>;
  return <><button className={className} onClick={() => dialog.current?.showModal()} aria-label={label}>{children}</button><dialog ref={dialog} className="contact-dialog" aria-labelledby={titleId}><button className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Fechar aviso"><X /></button><WhatsAppIcon size={36}/><h2 id={titleId}>Em breve, vamos conversar.</h2><p>O contato oficial da Kaverna Cell está sendo atualizado. Volte em breve para consultar modelos e condições.</p><button className="btn btn-primary" onClick={() => dialog.current?.close()}>CONTINUAR EXPLORANDO</button></dialog></>;
}

