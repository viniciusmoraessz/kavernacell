import type { Product, ProductCategory, ProductDetails, ProductImage } from '@/types/product';
import mediaData from './product-media.json';
import { demoIphonePrices } from './iphone-pricing';

type MediaAsset = { src: string; source: string; original: string };
const mediaDataTyped = mediaData as unknown as Record<string, MediaAsset> & { iphoneVariants?: Record<string, MediaAsset> };
const media: Record<string, MediaAsset> = mediaDataTyped;
const colorMedia = mediaDataTyped.iphoneVariants ?? {};
const iphoneModelAliases: Record<string, string> = {
  'iphone-xs-max': 'iphone-xs', 'iphone-11-pro-max': 'iphone-11-pro',
  'iphone-12-mini': 'iphone-12', 'iphone-12-pro-max': 'iphone-12-pro',
  'iphone-13-mini': 'iphone-13', 'iphone-13-pro-max': 'iphone-13-pro',
  'iphone-14-plus': 'iphone-14', 'iphone-14-pro-max': 'iphone-14-pro',
  'iphone-15-plus': 'iphone-15', 'iphone-15-pro-max': 'iphone-15-pro',
  'iphone-16-plus': 'iphone-16', 'iphone-16-pro-max': 'iphone-16-pro',
  'iphone-17-pro-max': 'iphone-17-pro', 'iphone-18-pro-max': 'iphone-18-pro',
  'iphone-17-air': 'iphone-air',
};
const iphoneColorKeys: Record<string, string> = {
  'Prateado': 'silver', 'Prata': 'silver', 'Cinza-espacial': 'spacegray',
  'Dourado': 'gold', 'Azul': 'blue', 'Verde': 'green', 'Roxo': 'purple',
  'Rosa': 'pink', 'Preto': 'black', 'Branco': 'white', 'Amarelo': 'yellow',
  'Vermelho': 'red', 'Coral': 'coral', 'Meia-noite': 'midnight', 'Estelar': 'starlight',
  'Verde meia-noite': 'midnightgreen', 'Azul-pacífico': 'blue', 'Azul-sierra': 'blue',
  'Cinza-grafite': 'graphite', 'Grafite': 'graphite', 'Verde-alpino': 'green',
  'Roxo-profundo': 'deeppurple', 'Preto-espacial': 'spaceblack',
  'Ultramarino': 'ultramarine', 'Verde-acinzentado': 'teal',
  'Titânio-deserto': 'deserttitanium', 'Titânio natural': 'naturaltitanium',
  'Titânio azul': 'bluetitanium', 'Titânio branco': 'whitetitanium', 'Titânio preto': 'blacktitanium',
  'Azul névoa': 'mistblue', 'Sálvia': 'sage', 'Lavanda': 'lavender',
  'Laranja-cósmico': 'cosmicorange', 'Azul-profundo': 'deepblue',
  'Borgonha': 'burgundy', 'Glacier': 'glacier', 'Céu noturno': 'nightsky', 'Branco estrela': 'starwhite',
  'Branco-nuvem': 'cloudwhite', 'Dourado-claro': 'lightgold', 'Azul-céu': 'skyblue',
};
const iphoneSwatches: Record<string, string> = {
  silver: '#e5e5e2', spacegray: '#56575a', gold: '#d6c2a6', blue: '#94b4cf',
  green: '#a4c5b3', purple: '#c5bedb', pink: '#edcbd0', black: '#303332',
  white: '#f1f1ec', yellow: '#f1db8b', red: '#c72636', coral: '#ef8276',
  midnight: '#252b32', starlight: '#eee9df', midnightgreen: '#4d6259',
  graphite: '#656662', deeppurple: '#62556f', spaceblack: '#333437',
  ultramarine: '#7683d3', teal: '#8db8ad', deserttitanium: '#c4aa91',
  naturaltitanium: '#b8b3a9', bluetitanium: '#4b576c', whitetitanium: '#e5e2dc',
  blacktitanium: '#454644', mistblue: '#b5c3d6', sage: '#afbca5', lavender: '#d8c9ee',
  cosmicorange: '#c66e42', deepblue: '#334567', burgundy: '#713343', glacier: '#d7e6e8',
  cloudwhite: '#f3f2ee', lightgold: '#e7d9bb', skyblue: '#b4c7d5',
};
const descriptions: Record<ProductCategory, string> = {
  iPhone: 'Do primeiro registro do dia às conversas que importam. Explore o design do seu próximo iPhone e escolha as opções que combinam com a sua rotina.',
  Mac: 'Um espaço para suas ideias ganharem forma. Conheça a família Mac e converse com a equipe para encontrar a geração e a configuração adequadas ao seu trabalho.',
  'Áudio': 'Sua trilha sonora acompanha você. Explore a família AirPods e descubra, com a equipe, qual modelo combina com seu jeito de ouvir.',
  'Apple Watch': 'Sua rotina, mais perto de você. Conheça a família Apple Watch e consulte as opções de geração, tamanho e conectividade.',
  iPad: 'Uma tela para estudar, desenhar e dar espaço às suas ideias. Explore o iPad e encontre a combinação de modelo e acessórios para o seu dia.',
  'Acessórios': 'Os detalhes também fazem diferença. Explore os acessórios e confirme a compatibilidade com seu aparelho antes de escolher.',
};
const features: Record<ProductCategory, ProductDetails['features']> = {
  iPhone: [
    { title: 'Seu dia em imagens', description: 'Explore um aparelho para registrar, compartilhar e guardar os momentos que importam.' },
    { title: 'Escolha com orientação', description: 'Converse sobre seu uso para escolher armazenamento e modelo.' },
    { title: 'Tudo conectado', description: 'Consulte a compatibilidade com os acessórios e dispositivos que você já usa.' },
  ],
  Mac: [
    { title: 'Trabalho e criação', description: 'Escolha pensando nos aplicativos e projetos da sua rotina.' },
    { title: 'Configuração sob consulta', description: 'Geração, chip, memória e armazenamento precisam ser confirmados com a equipe.' },
    { title: 'Seu espaço completo', description: 'Consulte monitores, teclados e acessórios compatíveis.' },
  ],
  'Áudio': [
    { title: 'Música no seu ritmo', description: 'Encontre o formato que combina com sua rotina e preferência de uso.' },
    { title: 'Conheça a geração', description: 'Recursos de áudio, encaixe e controles variam conforme o modelo.' },
    { title: 'Compatibilidade', description: 'Confirme os recursos disponíveis com o seu aparelho.' },
  ],
  'Apple Watch': [
    { title: 'No seu pulso', description: 'Compare as opções de caixa e pulseira com a equipe.' },
    { title: 'Rotina e movimento', description: 'Conheça os recursos de atividade da geração escolhida.' },
    { title: 'Conectividade', description: 'Consulte versões e compatibilidade com seu iPhone e operadora.' },
  ],
  iPad: [
    { title: 'Espaço para ideias', description: 'Estudo, leitura, criação e entretenimento em uma experiência portátil.' },
    { title: 'Sua configuração', description: 'Geração, armazenamento e conectividade sob consulta.' },
    { title: 'Mais possibilidades', description: 'Consulte Apple Pencil e teclados compatíveis com o modelo escolhido.' },
  ],
  'Acessórios': [
    { title: 'Um conjunto que funciona', description: 'Informe o modelo do seu aparelho para verificar compatibilidade.' },
    { title: 'Detalhes da escolha', description: 'Conexões, medidas e acabamento devem ser confirmados antes da compra.' },
    { title: 'Orientação da equipe', description: 'Tire suas dúvidas sobre uso e condições de garantia.' },
  ],
};

function reference(src: string, name: string, label = 'Visão geral'): ProductImage {
  return { src, alt: `${name} — ${label.toLowerCase()}, imagem de referência`, label };
}

// Acrescente informações confirmadas por SKU aqui. Ausência de opções é mostrada
// explicitamente na interface, sem inventar combinações de memória ou geração.
export function getProductDetails(product: Product): ProductDetails {
  const mediaModels = [...new Set([product.id, iphoneModelAliases[product.id] ?? product.id])];
  const defaultPhoto = mediaModels.map(model => colorMedia[`${model}-${iphoneColorKeys[product.color ?? '']}`]).find(Boolean);
  const newsroomImageKey: Record<string, string> = {
    'iphone-x': 'iphone-x-family', 'iphone-xs': 'iphone-xs-family', 'iphone-xs-max': 'iphone-xs-family',
    'iphone-xr': 'iphone-xr-family', 'iphone-11': 'iphone-11-family', 'iphone-11-pro': 'iphone-11-pro-family',
    'iphone-11-pro-max': 'iphone-11-pro-family', 'iphone-12': 'iphone-12-family', 'iphone-12-mini': 'iphone-12-family',
    'iphone-12-pro': 'iphone-12-pro-family', 'iphone-12-pro-max': 'iphone-12-pro-family',
    'iphone-13-pro': 'iphone-13-pro-family', 'iphone-13-pro-max': 'iphone-13-pro-family',
    'iphone-14-pro': 'iphone-14-pro-family', 'iphone-14-pro-max': 'iphone-14-pro-family',
    'iphone-15-pro': 'iphone-15-pro-family', 'iphone-15-pro-max': 'iphone-15-pro-family',
  };
  const newsroomImage = media[newsroomImageKey[product.id]]?.src;
  const familyImage = product.id === 'iphone-17' ? colorMedia['iphone-17-lavender']?.src ?? media['iphone-17-family']?.src
    : product.id === 'iphone-17-air' ? media['iphone-air-family']?.src
    : product.id.startsWith('iphone-17-pro') ? media['iphone-17-pro-family']?.src
    : product.id === 'iphone-duo' ? media['iphone-duo-family']?.src
    : ['iphone-18-pro', 'iphone-18-pro-max'].includes(product.id) ? colorMedia[`${product.id}-burgundy`]?.src ?? media['iphone-18-pro-family']?.src : newsroomImage;
  const familyColorsImage = product.id.startsWith('iphone-17-pro') ? media['iphone-17-pro-colors']?.src
    : product.id.startsWith('iphone-18-pro') ? media['iphone-18-pro-colors']?.src : undefined;
  const main = reference(defaultPhoto?.src ?? familyImage ?? product.image ?? media[product.id]?.src ?? '/images/logo-kaverna.png', product.name, defaultPhoto ? product.color : 'Visão geral');
  const base: ProductDetails = {
    ...product,
    tagline: product.category === 'iPhone' ? 'Um novo olhar para todos os seus dias.' : product.detail,
    description: descriptions[product.category],
    features: features[product.category],
    gallery: [main],
    colors: product.color ? [{ id: 'original', name: product.color, swatch: product.swatch ?? '#888888', images: [main] }] : [],
    configurations: product.category === 'iPhone' ? [{ id: 'storage', label: 'Armazenamento', options: ['128 GB'] }] : [],
    referenceNote: product.category === 'iPhone'
      ? 'Imagens e opções de referência do modelo. Disponibilidade, estado do aparelho e garantia devem ser confirmados com a loja.'
      : 'Imagem de referência da família. Geração, acabamento e configuração do produto oferecido devem ser confirmados com a loja.',
  };
  if (product.id === 'iphone-15') {
    const overview = reference('/images/catalog/iphone-15-overview.webp', 'iPhone 15', 'Família de acabamentos');
    base.gallery = [main, overview];
    base.colors = [
      { id: 'pink', name: 'Rosa', swatch: '#edcbd0', images: [main, overview] },
      { id: 'black', name: 'Preto', swatch: '#303332', images: [reference(media['iphone-15-black'].src, 'iPhone 15 preto'), overview] },
      { id: 'blue', name: 'Azul', swatch: '#c7d9df', images: [reference(media['iphone-15-blue'].src, 'iPhone 15 azul'), overview] },
      { id: 'green', name: 'Verde', swatch: '#d1dece', images: [reference(media['iphone-15-green'].src, 'iPhone 15 verde'), overview] },
    ];
    base.configurations = [{ id: 'storage', label: 'Armazenamento', options: ['128 GB', '256 GB', '512 GB'] }];
    base.features = [
      { title: 'Dynamic Island', description: 'Informações e atividades em uma área interativa da tela.' },
      { title: 'Tela de 6,1 polegadas', description: 'Super Retina XDR com tecnologia OLED.' },
      { title: 'Conexão USB-C', description: 'Uma conexão para recarregar e transferir dados.' },
    ];
  }
  if (product.category === 'iPhone') {
    const knownColors = base.colors;
    const colorNames: Record<string, string[]> = {
      'iphone-x': ['Prateado', 'Cinza-espacial'],
      'iphone-xs': ['Prateado', 'Cinza-espacial', 'Dourado'],
      'iphone-xs-max': ['Prateado', 'Cinza-espacial', 'Dourado'],
      'iphone-xr': ['Preto', 'Branco', 'Azul', 'Amarelo', 'Coral', 'Vermelho'],
      'iphone-11': ['Preto', 'Branco', 'Verde', 'Amarelo', 'Roxo', 'Vermelho'],
      'iphone-11-pro': ['Dourado', 'Verde meia-noite', 'Prateado', 'Cinza-espacial'],
      'iphone-11-pro-max': ['Dourado', 'Verde meia-noite', 'Prateado', 'Cinza-espacial'],
      'iphone-12': ['Preto', 'Branco', 'Azul', 'Verde', 'Roxo', 'Vermelho'],
      'iphone-12-mini': ['Preto', 'Branco', 'Azul', 'Verde', 'Roxo', 'Vermelho'],
      'iphone-12-pro': ['Azul-pacífico', 'Prateado', 'Cinza-grafite', 'Dourado'],
      'iphone-12-pro-max': ['Azul-pacífico', 'Prateado', 'Cinza-grafite', 'Dourado'],
      'iphone-13': ['Meia-noite', 'Estelar', 'Azul', 'Rosa', 'Verde', 'Vermelho'],
      'iphone-13-mini': ['Meia-noite', 'Estelar', 'Azul', 'Rosa', 'Verde', 'Vermelho'],
      'iphone-13-pro': ['Azul-sierra', 'Prateado', 'Grafite', 'Dourado', 'Verde-alpino'],
      'iphone-13-pro-max': ['Azul-sierra', 'Prateado', 'Grafite', 'Dourado', 'Verde-alpino'],
      'iphone-14': ['Meia-noite', 'Estelar', 'Azul', 'Roxo', 'Amarelo', 'Vermelho'],
      'iphone-14-plus': ['Meia-noite', 'Estelar', 'Azul', 'Roxo', 'Amarelo', 'Vermelho'],
      'iphone-14-pro': ['Roxo-profundo', 'Dourado', 'Prateado', 'Preto-espacial'],
      'iphone-14-pro-max': ['Roxo-profundo', 'Dourado', 'Prateado', 'Preto-espacial'],
      'iphone-15-plus': ['Rosa', 'Amarelo', 'Verde', 'Azul', 'Preto'],
      'iphone-15-pro': ['Titânio natural', 'Titânio azul', 'Titânio branco', 'Titânio preto'],
      'iphone-15-pro-max': ['Titânio natural', 'Titânio azul', 'Titânio branco', 'Titânio preto'],
      'iphone-16': ['Preto', 'Branco', 'Rosa', 'Ultramarino', 'Verde-acinzentado'],
      'iphone-16-plus': ['Preto', 'Branco', 'Rosa', 'Ultramarino', 'Verde-acinzentado'],
      'iphone-16-pro': ['Titânio-deserto', 'Titânio natural', 'Titânio branco', 'Titânio preto'],
      'iphone-16-pro-max': ['Titânio-deserto', 'Titânio natural', 'Titânio branco', 'Titânio preto'],
      'iphone-17': ['Preto', 'Lavanda', 'Azul névoa', 'Sálvia', 'Branco'],
      'iphone-17-air': ['Preto-espacial', 'Branco-nuvem', 'Dourado-claro', 'Azul-céu'],
      'iphone-17-pro': ['Prata', 'Laranja-cósmico', 'Azul-profundo'],
      'iphone-17-pro-max': ['Prata', 'Laranja-cósmico', 'Azul-profundo'],
      'iphone-duo': ['Céu noturno', 'Branco estrela'],
      'iphone-18-pro': ['Borgonha', 'Glacier', 'Prata', 'Preto'],
      'iphone-18-pro-max': ['Borgonha', 'Glacier', 'Prata', 'Preto'],
    };
    const swatches = ['#262b32', '#e8e6df', '#7a8ca9', '#e8bdc5', '#a5b2a2', '#b9a58e'];
    const names = colorNames[product.id] ?? [product.color ?? 'Preto', 'Prateado', 'Azul demonstrativo'];
    const availableImages: ProductImage[] = [];
    base.colors = names.map((name, index) => {
      const existing = knownColors.find((item) => item.name.toLowerCase() === name.toLowerCase());
      const colorKey = iphoneColorKeys[name];
      const variant = colorKey ? mediaModels.map((model) => colorMedia[`${model}-${colorKey}`]).find(Boolean) : undefined;
      const directCatalogImage = colorKey ? mediaModels.map((model) => media[`${model}-${colorKey}`]).find(Boolean) : undefined;
      const src = variant?.src ?? directCatalogImage?.src;
      const image = src ? reference(src, product.name, name)
        : familyColorsImage && name.toLowerCase() === product.color?.toLowerCase() ? main
        : familyColorsImage ? reference(familyColorsImage, product.name, 'linha completa de cores') : undefined;
      if (image) availableImages.push(image);
      return { ...(existing ?? { id: `color-${index}`, name, swatch: swatches[index % swatches.length] }), name, swatch: iphoneSwatches[colorKey] ?? existing?.swatch ?? swatches[index % swatches.length], images: image ? [image] : [] };
    });
    const defaultColorImage = base.colors.find((item) => item.name.toLowerCase() === (product.color ?? '').toLowerCase())?.images?.[0];
    if (defaultColorImage) base.gallery = [defaultColorImage, ...base.gallery.filter((image) => image.src !== defaultColorImage.src)];
    const prices = demoIphonePrices[product.id];
    if (prices) {
      const capacities = Object.keys(prices.lacrado);
      base.configurations = [{ id: 'storage', label: 'Armazenamento', options: capacities }];
    }
    if (defaultPhoto) {
      base.referenceNote = product.id.startsWith('iphone-18-pro')
        ? 'Imagens de referência enviadas para as cores Borgonha, Glacier, Prata e Preto. Confirme cor, estado, configuração e disponibilidade com a loja.'
        : product.id.startsWith('iphone-17-pro')
          ? 'Fotos oficiais individuais para os acabamentos Prata, Laranja-cósmico e Azul-profundo. Confirme disponibilidade, estado e garantia com a loja.'
          : product.id === 'iphone-duo'
            ? 'Fotos oficiais individuais do iPhone Duo para os acabamentos Céu noturno e Branco estrela. Confirme disponibilidade, estado e garantia com a loja.'
        : `Fotos de referência do ${product.name}. A imagem acompanha os acabamentos com foto individual cadastrada. Confirme disponibilidade, estado e garantia com a loja.`;
    } else if (newsroomImage) {
      base.referenceNote = 'Imagem oficial de referência do modelo. A foto pode não corresponder à cor selecionada; imagens individuais das demais cores ainda não foram cadastradas. Confirme cor, configuração e disponibilidade com a loja.';
    } else if (['iphone-17', 'iphone-17-air'].includes(product.id)) {
      base.referenceNote = 'Imagem oficial de referência do modelo. A foto pode não corresponder a todas as cores selecionadas; confirme cor, configuração e disponibilidade com a loja.';
    } else if (product.id.startsWith('iphone-18-pro')) {
      base.referenceNote = 'Imagens de referência enviadas para as cores Borgonha, Glacier, Prata e Preto. Confirme cor, estado, configuração e disponibilidade com a loja.';
    } else if (product.id.startsWith('iphone-17-pro')) {
      base.referenceNote = 'Fotos oficiais individuais para os acabamentos Prata, Laranja-cósmico e Azul-profundo. Confirme disponibilidade, estado e garantia com a loja.';
    } else if (product.id === 'iphone-duo') {
      base.referenceNote = 'Imagem oficial de apresentação do iPhone Duo. Confirme cor, capacidade, condição e disponibilidade com a equipe.';
    } else if (!['iphone-13', 'iphone-14', 'iphone-15', 'iphone-16'].includes(product.id)) {
      base.referenceNote = 'Imagem ilustrativa de outra geração. Cores e capacidades são opções demonstrativas; confirme estado, configuração, disponibilidade e garantia com a loja.';
    }
  }
  return base;
}
