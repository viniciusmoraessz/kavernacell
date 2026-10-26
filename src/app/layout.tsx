import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), title:'Kaverna Cell | iPhones e Acessórios',description:'Conheça os modelos de iPhone da Kaverna Cell. Consulte opções, valores e condições diretamente com nossa equipe.',icons:{icon:'/images/logo-kaverna.png',apple:'/images/logo-kaverna.png'},openGraph:{title:'Kaverna Cell | iPhones e Acessórios',description:'Seu próximo iPhone começa com uma boa escolha. Conheça os modelos e converse com nossa equipe.',locale:'pt_BR',type:'website',images:[{url:'/images/logo-kaverna.png',width:1254,height:1254,alt:'Kaverna Cell'}]}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning><body className={geist.variable}>{children}</body></html>}

