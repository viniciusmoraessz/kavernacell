'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

export default function Reveal({ children, className = '', delay = 0, ariaLabel }: { children: ReactNode; className?: string; delay?: number; ariaLabel?: string }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = element.current;
    if (!node || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node?.classList.add('is-revealed');
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      node.classList.add('is-revealed');
      observer.unobserve(node);
    }, { threshold: .12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={element} aria-label={ariaLabel} className={`scroll-reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>;
}
