import { mkdir, writeFile, readFile } from 'node:fs/promises';
import sharp from 'sharp';

const base = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/';
const images = [
  ['iphone-x', 'spacegray', 'iphone-x-spacegray-select-2017'],
  ['iphone-x', 'silver', 'iphone-x-silver-select-2017'],
  ['iphone-xs', 'gold', 'iphone-xs-gold-select-2018'],
  ['iphone-xs', 'spacegray', 'iphone-xs-spacegray-select-2018'],
  ['iphone-xr', 'blue', 'iphone-xr-blue-select-2018'],
  ['iphone-xr', 'coral', 'iphone-xr-coral-select-2018'],
  ['iphone-11', 'purple', 'iphone-11-purple-select-2019'],
  ['iphone-11', 'green', 'iphone-11-green-select-2019'],
  ['iphone-11-pro', 'midnightgreen', 'iphone-11-pro-midnightgreen-select-2019'],
  ['iphone-11-pro', 'gold', 'iphone-11-pro-gold-select-2019'],
  ['iphone-12', 'blue', 'iphone-12-blue-select-2020'],
  ['iphone-12', 'green', 'iphone-12-green-select-2020'],
  ['iphone-12-pro', 'pacificblue', 'iphone-12-pro-pacificblue-select-2020'],
  ['iphone-12-pro', 'graphite', 'iphone-12-pro-graphite-select-2020'],
  ['iphone-13', 'pink', 'iphone-13-pink-select-2021'],
  ['iphone-13', 'blue', 'iphone-13-blue-select-2021'],
  ['iphone-13-pro', 'sierrablue', 'iphone-13-pro-sierra-blue-select-2021'],
  ['iphone-13-pro', 'alpinegreen', 'iphone-13-pro-alpine-green-select-2022'],
  ['iphone-14', 'purple', 'iphone-14-purple-select-202209'],
  ['iphone-14-plus', 'blue', 'iphone-14-plus-blue-select-202209'],
  ['iphone-14-plus', 'purple', 'iphone-14-plus-purple-select-202209'],
  ['iphone-14-plus', 'yellow', 'iphone-14-plus-yellow-select-202303'],
  ['iphone-14', 'yellow', 'iphone-14-yellow-select-202303'],
  ['iphone-14-pro', 'deeppurple', 'iphone-14-pro-deeppurple-select-202209'],
  ['iphone-14-pro', 'spaceblack', 'iphone-14-pro-spaceblack-select-202209'],
  ['iphone-15', 'black', 'iphone-15-black-select-202309'],
  ['iphone-15', 'blue', 'iphone-15-blue-select-202309'],
  ['iphone-15', 'green', 'iphone-15-green-select-202309'],
  ['iphone-15-plus', 'pink', 'iphone-15-plus-pink-select-202309'],
  ['iphone-15-plus', 'blue', 'iphone-15-plus-blue-select-202309'],
  ['iphone-15-pro', 'naturaltitanium', 'iphone-15-pro-natural-titanium-select-202309'],
  ['iphone-15-pro', 'bluetitanium', 'iphone-15-pro-blue-titanium-select-202309'],
  ['iphone-16', 'ultramarine', 'iphone-16-ultramarine-select-202409'],
  ['iphone-16', 'teal', 'iphone-16-teal-select-202409'],
  ['iphone-16-plus', 'ultramarine', 'iphone-16-plus-ultramarine-select-202409'],
  ['iphone-16-plus', 'teal', 'iphone-16-plus-teal-select-202409'],
  ['iphone-16-pro', 'deserttitanium', 'iphone-16-pro-deserttitanium-select'],
  ['iphone-16-pro', 'naturaltitanium', 'iphone-16-pro-naturaltitanium-select'],
  ['iphone-17', 'lavender', 'iphone-17-lavender-select-2025'],
  ['iphone-17', 'mistblue', 'iphone-17-mistblue-select-2025'],
  ['iphone-17-pro', 'silver', 'iphone-17-pro-silver-select-2025'],
  ['iphone-17-pro', 'cosmicorange', 'iphone-17-pro-cosmicorange-select-2025'],
  ['iphone-18-pro', 'burgundy', 'iphone-18-pro-burgundy-select-2026'],
  ['iphone-18-pro', 'glacier', 'iphone-18-pro-glacier-select-2026'],
  ['iphone-18-pro', 'silver', 'iphone-18-pro-silver-select-2026'],
  ['iphone-18-pro', 'black', 'iphone-18-pro-black-select-2026'],
  ['iphone-duo', 'nightsky', 'iphone-duo-nightsky-select-2026'],
  ['iphone-duo', 'starwhite', 'iphone-duo-starwhite-select-2026'],
];
await mkdir('public/images/iphone-colors', { recursive: true });
const catalog = JSON.parse(await readFile('src/data/product-media.json', 'utf8'));
const variants = { ...(catalog.iphoneVariants ?? {}) };
for (const [model, color, asset] of images) {
  const key = `${model}-${color}`;
  const candidates = [asset, `${asset.replace(/-202[0-9]{2}$/, '')}`, `${asset.replace(/-select-202[0-9]{2}$/, '-select')}`];
  let downloaded = false;
  let lastError = '404';
  try {
    for (const candidate of [...new Set(candidates)]) {
      const url = `${base}${candidate}?wid=900&hei=1100&fmt=png-alpha`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(String(response.status));
        const buffer = Buffer.from(await response.arrayBuffer());
        const metadata = await sharp(buffer).metadata();
        if (!metadata.width || metadata.width < 100) throw new Error('invalid image');
        const src = `/images/iphone-colors/${key}.webp`;
        await sharp(buffer).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 90 }).toFile(`public${src}`);
        variants[key] = { src, source: 'Apple Store product image', original: url };
        console.log(`${key}: downloaded`);
        downloaded = true;
        break;
      } catch (error) { lastError = error.message; }
    }
    if (!downloaded) console.log(`${key}: unavailable (${lastError})`);
  } catch (error) {
    console.log(`${key}: unavailable (${error.message})`);
  }
}
const officialFamilies = {
  'iphone-duo-family': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-compare-iphone-duo-202609?.v=M0dlUVBobHVpY1h1dmlaR3RZekpENmZPZm9YejBValJVbXlTNDNkM1pFVjE5VXk1QVF5NWxrMFlTNWNpV2huNVM0TjRWdzF2UjRGVEY0c3dBQVZ6VFFlcU5xMENJdDhjbzVtS3hXU1dQS3c&fmt=png-alpha&hei=512&wid=400',
  'iphone-air-family': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-compare-iphone-air-202609?.v=M0dlUVBobHVpY1h1dmlaR3RZekpEMC9lSXF0eXpIalRkVVR5QXkvMTY3bDE5VXk1QVF5NWxrMFlTNWNpV2huNVM0TjRWdzF2UjRGVEY0c3dBQVZ6VFY3NC9UKzZjWlgwWjRhTEZ0Rlk0ZFk&fmt=png-alpha&hei=512&wid=400',
  'iphone-air-family': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-compare-iphone-air-202609?.v=M0dlUVBobHVpY1h1dmlaR3RZekpEMC9lSXF0eXpIalRkVVR5QXkvMTY3bDE5VXk1QVF5NWxrMFlTNWNpV2huNVM0TjRWdzF2UjRGVEY0c3dBQVZ6VFY3NC9UKzZjWlgwWjRhTEZ0Rlk0ZFk&fmt=png-alpha&hei=512&wid=400',
  'iphone-17-family': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-compare-iphone-17-202609?.v=M0dlUVBobHVpY1h1dmlaR3RZekpEL1l5N1hFTy9RTVZvRXBQbUJ5QTZYMUxxZU5scXpES1hnUm96ckN1R2pZN215d1FhSDJ0bkR0ZGZtUjZJNmFveGJIT1NwVjArc3diTWlTKzkwUStjL0U&fmt=png-alpha&hei=512&wid=400',
  'iphone-17-pro-family': 'https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-cosmic-orange-250909_inline.jpg.large.jpg',
  'iphone-17-pro-colors': 'https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-color-lineup-250909_inline.jpg.large.jpg',
  'iphone-18-pro-family': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-compare-iphone-18-pro-202609?.v=M0dlUVBobHVpY1h1dmlaR3RZekpEMEhRUmlKNkhhdE80VTZIL1ZUdjd2eUpxQWhXdDZiUERGcnlNZW9hNkhxRmJPbDJJWDFrVGJEYlIxTitTcHhVWldHUUw4RnF3MmwyMUVGYm13ODRTWXlINUhveGhFc1lXWld4RkQ2dkFBMi8&fmt=png-alpha&hei=512&wid=400',
  'iphone-18-pro-colors': 'https://www.apple.com/v/iphone-18-pro/d/images/overview/highlights/colors_endframe__czfie0zmty4i_large.jpg',
};
for (const [id, url] of Object.entries(officialFamilies)) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(String(response.status));
    const buffer = Buffer.from(await response.arrayBuffer());
    const src = `/images/iphone-colors/${id}-official.webp`;
    await sharp(buffer).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 90 }).toFile(`public${src}`);
    catalog[id] = { src, source: 'https://www.apple.com/iphone/', original: url };
    console.log(`${id}: downloaded`);
  } catch (error) { console.log(`${id}: unavailable (${error.message})`); }
}
const newsroomFamilies = {
  'iphone-x-family': 'https://www.apple.com/newsroom/2017/09/the-future-is-here-iphone-x/',
  'iphone-xs-family': 'https://www.apple.com/newsroom/2018/09/iphone-xs-and-iphone-xs-max-bring-the-best-and-biggest-displays-to-iphone/',
  'iphone-xr-family': 'https://www.apple.com/newsroom/2018/09/apple-introduces-iphone-xr/',
  'iphone-11-family': 'https://www.apple.com/newsroom/2019/09/apple-introduces-dual-camera-iphone-11/',
  'iphone-11-pro-family': 'https://www.apple.com/newsroom/2019/09/iphone-11-pro-and-iphone-11-pro-max-the-most-powerful-and-advanced-smartphones/',
  'iphone-12-family': 'https://www.apple.com/newsroom/2020/10/apple-announces-iphone-12-and-iphone-12-mini-a-new-era-for-iphone-with-5g/',
  'iphone-12-pro-family': 'https://www.apple.com/newsroom/2020/10/apple-introduces-iphone-12-pro-and-iphone-12-pro-max-with-5g/',
  'iphone-13-pro-family': 'https://www.apple.com/newsroom/2021/09/apple-unveils-iphone-13-pro-and-iphone-13-pro-max-more-pro-than-ever-before/',
  'iphone-14-pro-family': 'https://www.apple.com/newsroom/2022/09/apple-debuts-iphone-14-pro-and-iphone-14-pro-max/',
  'iphone-15-pro-family': 'https://www.apple.com/newsroom/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/',
};
for (const [id, page] of Object.entries(newsroomFamilies)) {
  try {
    const response = await fetch(page);
    if (!response.ok) throw new Error(String(response.status));
    const html = await response.text();
    const tags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => tag);
    const tag = tags.find((item) => /property=["']og:image["']/i.test(item));
    const original = tag?.match(/content=["']([^"']+)/i)?.[1];
    if (!original) throw new Error('no official page image');
    const imageResponse = await fetch(new URL(original.replaceAll('&amp;', '&'), response.url));
    if (!imageResponse.ok) throw new Error(String(imageResponse.status));
    const buffer = Buffer.from(await imageResponse.arrayBuffer());
    const metadata = await sharp(buffer).metadata();
    if (!metadata.width || metadata.width < 100) throw new Error('invalid image');
    const src = `/images/iphone-colors/${id}-official.webp`;
    await sharp(buffer).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 90 }).toFile(`public${src}`);
    catalog[id] = { src, source: response.url, original };
    console.log(`${id}: downloaded`);
  } catch (error) { console.log(`${id}: unavailable (${error.message})`); }
}
catalog.iphoneVariants = variants;
await writeFile('src/data/product-media.json', `${JSON.stringify(catalog, null, 2)}\n`);
