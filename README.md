# Kaverna Cell

Landing page frontend em Next.js (App Router), React, TypeScript, Tailwind CSS e Lucide React. Não contém backend comercial, autenticação, banco de dados, carrinho ou checkout.

## Executar

Requer Node.js 20.9 ou superior; desenvolvido com Node.js 24.

```sh
npm ci
npm run dev
```

Acesse http://localhost:3000. Para produção: `npm run build` e `npm start`.

## Verificações

```sh
npm run typecheck
npm run lint
npm run build
```

## Configuração e conteúdo

- `src/lib/config.ts`: WhatsApp oficial, mensagem inicial, Instagram e navegação. Preencher `whatsapp` somente com dígitos, incluindo país e DDD. O campo está intencionalmente vazio. Enquanto estiver vazio/inválido, os CTAs abrem um aviso acessível, sem enviar a conversa a terceiros. Depois de preenchido, abrem `wa.me` com mensagens específicas por produto/categoria/troca.
- `src/data/catalog.ts`: catálogo editável do ecossistema Apple, com categorias para iPhone, Mac, Áudio, Apple Watch, iPad e Acessórios. A vitrine filtra os dados por categoria sem duplicar seções ou markup.
- `src/data/products.ts`: reexport compatível da seleção de iPhones para integrações existentes.
- `src/data/product-details.ts`: descrições, características, galerias, cores e configurações das páginas individuais. O iPhone 15 demonstra quatro acabamentos com imagens próprias e três capacidades; os demais exibem apenas as opções cadastradas, sem presumir estoque.
- `src/data/product-media.json`: arquivos das imagens e URLs de origem na Apple. Fotos de famílias não confirmam geração ou disponibilidade da loja.
- `src/app/produto/[slug]/page.tsx`: rota individual, metadata, produtos relacionados e tratamento de produto inexistente.
- `src/components/product/`: seleção sincronizada e galeria ampliada com Escape, setas, ciclo de foco e restauração do foco.
- `src/lib/categories.ts`: identificadores das categorias e links de retorno. O hash da URL mantém a categoria selecionada e permite compartilhar o filtro.
- `src/app/layout.tsx`: metadata, idioma e fonte otimizada pelo Next.js.
- `.env.example`: copiar para `.env.local` e preencher `NEXT_PUBLIC_SITE_URL` com o domínio definitivo antes de publicar. Enquanto ausente, o Open Graph usa localhost.
- `src/app/globals.css`: tokens da marca, componentes visuais, breakpoints e movimento reduzido.
- `src/components/home/`: Hero, Categories, FeaturedProducts, TradeInBanner, Benefits, About e FinalCTA.
- `src/components/layout/`: cabeçalho, rodapé e botão flutuante.
- `src/components/ui/WhatsAppLink.tsx`: link e aviso de contato indisponível.
- `public/images/logo-original.png`: nova logo oficial fornecida pela loja, preservada sem redesenho. PNG 1254 × 1254 com transparência.
- `public/images/iphone-*.png`: imagens individuais de produto do CDN da Apple. Ver `public/images/SOURCES.md`.
- `public/images/catalog/`: imagens WebP locais das demais famílias e variantes. `scripts/fetch-product-media.mjs` registra as fontes e prepara os arquivos; não é executado no navegador nem necessário em produção.

## Informações pendentes da loja

1. WhatsApp oficial com país e DDD.
2. Instagram oficial, caso deva aparecer.
3. Modelos, capacidades, cores, disponibilidade e preços reais.
4. Condições e prazos de garantia, avaliação e troca.
5. Domínio definitivo para URLs absolutas de SEO/Open Graph.
6. Logo original em resolução maior, preferencialmente PNG transparente ou SVG.

Os títulos comerciais solicitados no briefing foram preservados; a vitrine está identificada como ilustrativa. Confirmar a seleção de “mais vendidos” antes da publicação. Nenhuma avaliação de clientes, endereço, parcelamento ou garantia Apple foi inventada.

O projeto é entregue localmente. Nenhum deploy foi solicitado nesta etapa.

## Adicionar produtos e variantes

Inclua o produto com um `id` único em `src/data/catalog.ts` e informe `image` com o caminho de uma imagem local. A vitrine, a rota `/produto/<id>` e os relacionados passam a usar esse cadastro. Inclua os detalhes e opções confirmados em `getProductDetails`, no arquivo `src/data/product-details.ts`. Cada cor pode ter sua própria lista `images`; sem ela, a interface mantém a galeria principal e informa a ausência de foto específica. As configurações são grupos com identificador, título e opções. Não cadastre combinações indisponíveis como ofertas. Execute o build após alterações para regenerar as rotas estáticas.

As páginas são vitrines para consulta. Escolher cor/capacidade não reserva produto nem confirma estoque. A mensagem de WhatsApp inclui o produto e a seleção atual, quando o número oficial estiver configurado.

## Validação executada

Atualização de 24/10/2026: TypeScript, ESLint e build de produção passaram após a expansão. As 28 rotas de produtos retornaram HTTP 200 e uma rota inexistente retornou 404. Os 28 arquivos do manifesto de mídia foram decodificados com sucesso. No navegador foram exercitados os seis filtros e atalhos, retorno à categoria, menu mobile entre páginas, seleção de cores/capacidade do iPhone 15, atualização da imagem, galeria com uma e duas imagens, setas, Escape, Tab/Shift+Tab e restauração do foco. O aviso de WhatsApp sem número também foi conferido. Medições responsivas em 320, 390, 768 e 1440 px não indicaram overflow horizontal. Foi corrigido o aviso do Next sobre rolagem suave; não surgiram novos erros ou avisos nas navegações posteriores. Capturas: `docs/product-desktop.png` e `docs/product-mobile.png`. Movimento reduzido está implementado em CSS e no fechamento do modal; não foi testado com a preferência do sistema alterada. O envio real pelo WhatsApp depende do número oficial.

Em 23/10/2026: TypeScript, ESLint e build de produção concluídos sem erros; build final sem avisos. HTTP local retornou 200. Navegador inspecionado em 320, 390, 768, 1440 e 1920 px, sem overflow horizontal nas medições. Screenshots completos em `docs/desktop.png` e `docs/mobile.png`; preview em `docs/preview.png`.

Verificados: carregamento das oito instâncias de imagem, destinos das âncoras, CTA para modelos, navegação até Sobre e Contato, abertura/fechamento do menu mobile, consulta de produto com aviso de contato, Escape e retorno de foco do diálogo. Console sem erros ou avisos na revisão final. Validação e codificação das URLs WhatsApp exercitadas em memória, sem abrir conversa ou enviar mensagens. A integração com o número oficial permanece pendente. Não foram medidos Core Web Vitals nem executados testes com leitor de tela.
