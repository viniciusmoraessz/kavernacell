import { store } from './config';
export function whatsappUrl(message: string = store.message): string | null {
  return /^\d{10,15}$/.test(store.whatsapp)
    ? `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}` : null;
}
