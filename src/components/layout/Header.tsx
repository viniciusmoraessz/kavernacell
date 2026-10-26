'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { navigation } from '@/lib/config';
export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 12 || currentY < lastY) setHidden(false);
      else if (currentY > lastY + 8 && !open) setHidden(true);
      lastY = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);
  return <header className={`header ${hidden ? 'header-hidden' : ''}`}>
    <div className="shell header-inner">
      <Link href="/#inicio" className="brand" aria-label="Kaverna Cell — início"><Image src="/images/logo-kaverna.png" alt="Kaverna Cell" width={150} height={150} priority /></Link>
      <nav aria-label="Navegação principal" className="desktop-nav">{navigation.map(([name, href]) => <a key={href} href={href}>{name}</a>)}</nav>
      <button ref={toggle} className="menu-toggle" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação mobile" onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } }}>{navigation.map(([name, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{name}</a>)}</nav>}
  </header>;
}
