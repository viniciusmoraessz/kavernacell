# Assets

Logo: imagem original fornecida pelo usuário, sem redesenho ou tratamento.

Imagens de produto obtidas do CDN Apple em 2026-10-23, com parâmetros `wid=800&hei=1000&fmt=png-alpha&.v=1`:

- iphone-13.png: https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021
- iphone-14.png: https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-blue-select-202209
- iphone-15.png: https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pink-select-202309
- iphone-16.png: https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-ultramarine-select-202409
- iphone-pro.png: https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-deserttitanium-select

Imagens de referência dos modelos; não são fotografias do estoque da loja. A captura do mockup não foi usada como fundo ou interface.

Os cards e as variantes individuais agora priorizam os recortes Apple Store de `public/images/catalog-standard/`. O script `scripts/prepare-catalog-images.mjs` apara somente as margens externas vazias e exporta os aparelhos em uma tela branca de 1280 × 1600 com margens regulares, preservando proporção e cor. Os arquivos anteriores são preservados em `catalog-clean/`, `catalog-studio/` e `iphone-colors/`. Novos nomes de arquivo evitam reaproveitar as versões antigas no cache de imagens do Next.js. A origem de cada arquivo está registrada em `src/data/product-media.json`; fotos de campanha não são usadas quando existe recorte individual.

Variantes de cor e imagens de produto baixadas de URLs oficiais da Apple em 2026-10-24; os arquivos locais ficam em `public/images/iphone-colors/` e os endereços de origem estão registrados em `src/data/product-media.json`. Quando não há arquivo de uma cor individual, a página mantém uma foto oficial do modelo ou da linha de cores e informa essa limitação.

Para iPhone 18 Pro e Pro Max, as imagens Borgonha, Glacier, Prata e Preto vieram dos quatro arquivos enviados pelo usuário. Foram recortadas das margens externas e exportadas em WebP 1280 × 1600 para corresponder ao enquadramento do restante do catálogo. Os nomes de origem estão anotados em `src/data/product-media.json`.

- iPhone Duo: imagem oficial Apple Store `iphone-compare-iphone-duo-202609`.
- iPhone Air: imagem oficial Apple Store `iphone-compare-iphone-air-202609`.
- iPhone 17: imagem oficial Apple Store `iphone-compare-iphone-17-202609`.
- iPhone 17 Pro e linha de cores: imagens do comunicado oficial Apple Newsroom, setembro de 2025.
- iPhone 18 Pro e linha de cores: imagens oficiais Apple Store e Apple.com, setembro de 2026.
- Modelos iPhone X a iPhone 15 Pro: imagens de referência extraídas dos comunicados oficiais Apple Newsroom de cada geração.
