import { mkdir, writeFile, readFile } from 'node:fs/promises';
import sharp from 'sharp';

const pages = {
  'mac-studio': 'mac-studio', 'studio-display': 'studio-display',
  adaptadores: 'shop/product/MW5M3AM/A/usb-c-digital-av-multiport-adapter',
  'magic-keyboard': 'shop/product/mjlx4ll/a/magic-keyboard-usb-c-us-english',
  'magic-mouse': 'shop/product/MXK53AM/A/magic-mouse-usb-c-white-multi-touch-surface',
  'magic-trackpad': 'shop/product/MXK93AM/A/magic-trackpad-usb-c-white-multi-touch-surface',
  'macbook-air': 'macbook-air', 'macbook-pro': 'macbook-pro', imac: 'imac',
  'mac-mini': 'mac-mini', 'airpods': 'airpods', 'airpods-pro': 'airpods-pro',
  'airpods-max': 'airpods-max', 'watch-se': 'apple-watch-se',
  'watch-series': 'apple-watch-series-11', 'watch-ultra': 'apple-watch-ultra-3',
  ipad: 'ipad', 'ipad-mini': 'ipad-mini', 'ipad-air': 'ipad-air', 'ipad-pro': 'ipad-pro',
  'apple-pencil': 'apple-pencil', magsafe: 'shop/product/mgd74ll/a/magsafe-charger-1-m',
  carregadores: 'shop/product/MWVV3AM/A/20w-usb-c-power-adapter', capas: 'shop/product/MYY13ZM/A/iphone-16-silicone-case-with-magsafe-black',
};
await mkdir('public/images/catalog', { recursive: true });
const media = JSON.parse(await readFile('src/data/product-media.json', 'utf8').catch(() => '{}'));
async function save(id, url, source) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const image = sharp(buffer);
  const meta = await image.metadata();
  if (!meta.width || meta.width < 100) throw new Error('Imagem inválida');
  const file = `/images/catalog/${id}.webp`;
  await image.resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 88 }).toFile(`public${file}`);
  media[id] = { src: file, source, original: url };
  console.log(`${id}: OK`);
}
for (const [id, page] of Object.entries(pages)) {
  if (media[id]) continue;
  try {
    const source = `https://www.apple.com/${page}/`;
    let response = await fetch(source);
    let html = await response.text();
    if ((id === 'watch-series' || id === 'watch-ultra') && response.url.endsWith('/watch/')) {
      const family = id === 'watch-series' ? 'series' : 'ultra';
      const path = html.match(new RegExp(`href=["'](/apple-watch-${family}-[0-9]+/)`))?.[1];
      if (path) { response = await fetch(`https://www.apple.com${path}`); html = await response.text(); }
    }
    const tag = html.match(/<meta[^>]*property=["']og:image["'][^>]*>/i)?.[0];
    let url = tag?.match(/content=["']([^"']+)/i)?.[1];
    if (url?.includes('og-default')) {
      const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => ({
        src: tag.match(/\bsrc=["']([^"']+)/i)?.[1],
        alt: tag.match(/\balt=["']([^"']+)/i)?.[1],
      })).filter(image => image.src?.includes('storeimages') && image.alt);
      console.log(`${id} candidates: ${JSON.stringify(images.slice(0, 4))}`);
      url = images[0]?.src?.replace(/wid=\d+/, 'wid=1400').replace(/hei=\d+/, 'hei=1400');
    }
    if (!url) throw new Error('Sem imagem Open Graph');
    await save(id, new URL(url.replaceAll('&amp;', '&'), response.url).href, response.url);
  } catch (error) { console.log(`${id}: ${error.message}`); }
}
for (const color of ['black', 'blue', 'green']) {
  if (media[`iphone-15-${color}`]) continue;
  const url = `https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-${color}-select-202309?wid=1000&hei=1200&fmt=png-alpha`;
  try { await save(`iphone-15-${color}`, url, 'https://support.apple.com/en-ie/111831'); }
  catch (error) { console.log(error.message); }
}
if (!media['iphone-15-overview']) {
  await save('iphone-15-overview', 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone_15_hero.png', 'https://support.apple.com/en-ie/111831');
}
await writeFile('src/data/product-media.json', JSON.stringify(media, null, 2) + '\n');
