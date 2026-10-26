'use client';
import { useSyncExternalStore } from 'react';
import { categoryFromHash } from './categories';

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback);
  window.addEventListener('popstate', callback);
  return () => {
    window.removeEventListener('hashchange', callback);
    window.removeEventListener('popstate', callback);
  };
}
export function useCatalogCategory() {
  return useSyncExternalStore(subscribe, () => categoryFromHash(window.location.hash), () => 'iPhone' as const);
}
