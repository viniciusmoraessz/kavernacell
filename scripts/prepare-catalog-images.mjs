import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const manifest = JSON.parse(await readFile('src/data/product-media.json', 'utf8'));
const directory = 'public/images/catalog-clean';
await mkdir(directory, { recursive: true });
const variants = manifest.iphoneVariants;
const groups = [
  ['iphone-x', '2017', ['silver', 'spacegray']],
  ['iphone-xs', '2018', ['silver', 'spacegray', 'gold']],
  ['iphone-xr', '201809', ['black', 'white', 'blue', 'yellow', 'coral', 'red']],
  ['iphone-11', '2019', ['black', 'white', 'green', 'yellow', 'purple', 'red']],
  ['iphone-11-pro', '2019', ['gold', 'midnightgreen', 'silver', 'spacegray']],
  ['iphone-12', '2020', ['black', 'white', 'blue', 'green', 'purple', 'red']],
  ['iphone-12-pro', '2020', ['blue', 'silver', 'graphite', 'gold']],
  ['iphone-13', '2021', ['midnight', 'starlight', 'blue', 'pink', 'green', 'red']],
  ['iphone-13-pro', '2021', ['blue', 'silver', 'graphite', 'gold', 'green']],
  ['iphone-14', '202209', ['midnight', 'starlight', 'blue', 'purple', 'yellow', 'red']],
  ['iphone-14-plus', '202209', ['midnight', 'starlight', 'blue', 'purple', 'yellow', 'red']],
  ['iphone-14-pro', '202209', ['deeppurple', 'gold', 'silver', 'spaceblack']],
  ['iphone-15', '202309', ['pink', 'yellow', 'green', 'blue', 'black']],
  ['iphone-15-plus', '202309', ['pink', 'yellow', 'green', 'blue', 'black']],
  ['iphone-15-pro', '202309', ['naturaltitanium', 'bluetitanium', 'whitetitanium', 'blacktitanium']],
  ['iphone-16', '202409', ['black', 'white', 'pink', 'ultramarine', 'teal']],
  ['iphone-16-plus', '202409', ['black', 'white', 'pink', 'ultramarine', 'teal']],
  ['iphone-16-pro', '202409', ['deserttitanium', 'naturaltitanium', 'whitetitanium', 'blacktitanium']],
  ['iphone-17', '202509', ['black', 'lavender', 'mistblue', 'sage', 'white']],
  ['iphone-air', '202509', ['spaceblack', 'cloudwhite', 'lightgold', 'skyblue']],
  ['iphone-17-pro', '202509', ['silver', 'cosmicorange', 'deepblue']],
  ['iphone-18-pro', '202609', ['burgundy', 'glacier', 'silver', 'black']],
];
const sizeVariants = {
  'iphone-xs': ['iphone-xs-max'], 'iphone-11-pro': ['iphone-11-pro-max'],
  'iphone-12': ['iphone-12-mini'], 'iphone-12-pro': ['iphone-12-pro-max'],
  'iphone-13': ['iphone-13-mini'], 'iphone-13-pro': ['iphone-13-pro-max'],
  'iphone-14-pro': ['iphone-14-pro-max'], 'iphone-15-pro': ['iphone-15-pro-max'],
  'iphone-16-pro': ['iphone-16-pro-max'], 'iphone-17-pro': ['iphone-17-pro-max'],
  'iphone-18-pro': ['iphone-18-pro-max'],
};
const normalizeOnly = process.argv.includes('--normalize-only');
const refreshQuality = process.argv.includes('--refresh-quality') || process.argv.includes('--iphone-17-pro-only') || process.argv.includes('--duo-only');
const refreshIphone17Pro = process.argv.includes('--iphone-17-pro-only');
const onlyModels = new Set(process.argv.slice(2).filter(value => !value.startsWith('--')));
// These per-finish Apple Store images keep the Duo color selector tied to a real photo.
if (process.argv.includes('--refresh-quality') || process.argv.includes('--duo-only')) {
  variants['iphone-duo-nightsky'] = {
    src: '/images/catalog-clean/iphone-duo-nightsky.webp', source: 'Apple Store product image',
    original: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-duo-finish-select-night-sky-202609?wid=940&hei=1112&fmt=png-alpha&.v=L2FnUkNTRm43ZDRCREFsdzlaeThkZ3h0LzRVb3pVcDdFRFlBZW9LdlZnTTY3eU1sRElTUWw3VmkwaFcvWFFZdVQ5NVJ4OStiQklybHZqYkJwOUI0UW54dHNyNHVwMVJTcUJTRDV4amNZM3JXeEN5bXRCTGIyQkNzYVFpWTFyclA',
  };
  variants['iphone-duo-starwhite'] = {
    src: '/images/catalog-clean/iphone-duo-starwhite.webp', source: 'Apple Store product image',
    original: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-duo-finish-select-star-white-202609?wid=940&hei=1112&fmt=png-alpha&.v=L2FnUkNTRm43ZDRCREFsdzlaeThka1hsOUZkQmZFRkQ2eEh0dEM0bVFwVjZIYUZiOEZCU1dSYmlzT2FMVUpPY1gyaWxBVG1PRTU2YzhCN2c2emhzWHZ5ZTZTY3RKM0U0VzN2UzRGTGtzQ3F1ZFJUNEY5WjZkU21Ua0dNWEh2Zy8',
  };
}
if (refreshIphone17Pro) {
  for (const color of ['silver', 'cosmicorange', 'deepblue']) {
    for (const [model, size] of [['iphone-17-pro', '6-3inch'], ['iphone-17-pro-max', '6-9inch']]) {
      const key = `${model}-${color}`;
      const asset = `iphone-17-pro-finish-select-202509-${size}-${color}`;
      variants[key] = {
        ...(variants[key] ?? {}),
        src: `/images/catalog-standard/${key}.webp`, source: 'Apple Store product image',
        original: `https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/${asset}?wid=1600&hei=2000&fmt=png-alpha`,
      };
    }
  }
}
const requests = groups.flatMap(([model, date, colors]) => [model, ...(sizeVariants[model] ?? [])].flatMap(id => colors.map(color => [id, color, date]))).filter(([model]) => !normalizeOnly && !refreshQuality && (!onlyModels.size || onlyModels.has(model)));
async function downloadVariant([model, color, date]) {
  if (variants[`${model}-${color}`]) return;
  const candidates = [
    `${model}-${color}-select-${date}`, `${model}-${color}-select`,
    `${model.replace('iphone-', 'iphone')}-${color}-select-${date}`,
    `${model}-finish-select-${date}-6-3inch-${color}`,
    `${model}-finish-select-${date}-6-1inch-${color}`,
    `${model}-finish-select-${date}-6-9inch-${color}`,
    `${model}-finish-select-${date}-6-7inch-${color}`,
    `${model.replace('-pro-max', '-pro')}-finish-select-${date}-6-9inch-${color}`,
    `refurb-${model}-${color}-${date.slice(0, 4)}`,
    `refurb-${model}-${color}-${date.slice(0, 4)}_GEO_US`,
    `${model}-${color.replace('spacegray', 'space-gray').replace('midnightgreen', 'midnight-green')}-select-${date}`,
    `${model}-${color.replace('spacegray', 'space-grey').replace('red', 'product-red')}-select-${date}`,
    `${model}-${color}-select-2021`,
  ];
  for (const asset of candidates) {
    const original = `https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/${asset}?wid=1000&hei=1200&fmt=png-alpha`;
    try {
      const response = await fetch(original, { signal: AbortSignal.timeout(12000) });
      if (!response.ok) continue;
      const bytes = Buffer.from(await response.arrayBuffer());
      const meta = await sharp(bytes).metadata();
      if (!meta.hasAlpha || meta.width < 300) continue;
      const key = `${model}-${color}`;
      const src = `/images/catalog-clean/${key}.webp`;
      await sharp(bytes).trim().resize(640, 800, { fit: 'contain', background: '#ffffff00' }).webp({ quality: 95 }).toFile(`public${src}`);
      variants[key] = { src, source: 'Apple Store', original };
      console.log(`${key}: individual image downloaded`);
      break;
    } catch { /* Try the next official asset. */ }
  }
}
for (let index = 0; index < requests.length; index += 5) {
  await Promise.all(requests.slice(index, index + 5).map(downloadVariant));
}

// Crop only empty outer margins, then export the complete device on one consistent canvas.
// White and transparent source margins receive the same white presentation surface.
await mkdir('public/images/catalog-standard', { recursive: true });
const assets = { ...variants, 'iphone-air-family': manifest['iphone-air-family'], 'iphone-duo-family': manifest['iphone-duo-family'] };
async function exportAsset([key, asset]) {
  if (!asset || (asset.src.startsWith('/images/catalog-standard/') && !refreshQuality)) return;
  let input;
  if (process.argv.includes('--refresh-sources') || refreshQuality) {
    if (/^https?:\/\//i.test(asset.original)) {
      const source = new URL(asset.original);
      if (!key.startsWith('iphone-duo-')) {
        source.searchParams.set('wid', '1600');
        source.searchParams.set('hei', '2000');
      }
      try {
        const response = await fetch(source, { signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw new Error(String(response.status));
        input = Buffer.from(await response.arrayBuffer());
      } catch (error) { console.log(`${key}: retained local source (${error.message})`); }
    }
  }
  if (!input) input = await readFile(`public${asset.src}`);
  if (refreshIphone17Pro && /^iphone-17-pro(?:-max)?-(?:silver|cosmicorange|deepblue)$/.test(key)) {
    const metadata = await sharp(input).metadata();
    const left = Math.round(metadata.width * 0.35);
    const top = Math.round(metadata.height * 0.35);
    const width = Math.round(metadata.width * 0.3125);
    const height = Math.round(metadata.height * 0.35);
    const crop = await sharp(input).extract({ left, top, width, height }).raw().toBuffer({ resolveWithObject: true });
    for (let index = 0; index < crop.data.length; index += crop.info.channels) {
      if (crop.data[index] === 245 && crop.data[index + 1] === 245 && crop.data[index + 2] === 247) {
        crop.data[index] = 255;
        crop.data[index + 1] = 255;
        crop.data[index + 2] = 255;
      }
    }
    input = await sharp(crop.data, { raw: crop.info }).png().toBuffer();
  }
  // Flatten in a separate pipeline: sharp otherwise trims before compositing the white margins.
  const flattened = await sharp(input).flatten({ background: '#fff' }).toBuffer();
  const src = `/images/catalog-standard/${key}.webp`;
  await sharp(flattened).trim({ background: '#fff', threshold: 6 }).resize(1120, 1440, { fit: 'contain', background: '#fff' }).extend({ top: 80, bottom: 80, left: 80, right: 80, background: '#fff' }).webp({ quality: 94 }).toFile(`public${src}`);
  asset.src = src;
}
const assetEntries = Object.entries(assets).filter(([key]) => {
  if (process.argv.includes('--duo-only')) return key.startsWith('iphone-duo-');
  if (refreshIphone17Pro) return /^iphone-17-pro(?:-max)?-(?:silver|cosmicorange|deepblue)$/.test(key);
  return true;
});
for (let index = 0; index < assetEntries.length; index += 5) {
  await Promise.all(assetEntries.slice(index, index + 5).map(exportAsset));
}
await writeFile('src/data/product-media.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Prepared ${assetEntries.length} consistently framed images.`);
