# O que foi feito para tentar aprovar o AdSense

Assim como no seu outro projeto, o motivo mais provável da reprovação é que
o site era **um app React de página única**, só com a ferramenta, sem
política de privacidade, sem páginas institucionais e sem conteúdo
textual original — isso cai nos motivos "Conteúdo de baixo valor" e
"Site não pronto (páginas faltando)".

## Mudanças feitas

1. **Novas páginas estáticas** em `public/` (viram parte da raiz do build
   automaticamente, ex: `/sobre.html`):
   - `sobre.html`
   - `contato.html`
   - `privacidade.html` (menciona explicitamente cookies do Google AdSense)
   - `termos-de-uso.html`
   - `404.html`
2. **Menu de navegação** (`SiteNav.jsx`) ligando o app React às páginas
   estáticas, visível no topo do app.
3. **Rodapé com links institucionais** (`SiteFooter.jsx`).
4. **Conteúdo textual original** (`ContentSection.jsx`), com explicação de
   como a roleta funciona, casos de uso e um FAQ — aparece logo abaixo da
   ferramenta, dentro do próprio app React.
5. **`robots.txt`**, **`sitemap.xml`** e **`ads.txt`** em `public/`, já
   preenchidos com seu ID de publisher (`pub-5326193608796059`).
6. Build testado com `npm run build` — todas as páginas novas aparecem
   corretamente em `dist/` junto com o app.

Nenhuma mudança visual ou de funcionalidade foi feita na roleta em si — só
foram adicionados nav, rodapé, seção de conteúdo e as páginas novas.

## O que você ainda precisa verificar

- **Domínio próprio**: confirme no painel do AdSense que a URL cadastrada
  é exatamente a URL publicada.
- **Ajuste os links**: os links internos e o `sitemap.xml`/`robots.txt`
  apontam para `https://pedrinhotrembala.github.io/Sorteio/...` — se você
  publicar em outro domínio, atualize essas URLs (inclusive as tags
  `<link rel="canonical">` em cada página).
- **E-mail de contato**: troquei por um e-mail de exemplo
  (`contato.roletasortuda@gmail.com`) — substitua pelo seu e-mail real
  antes de publicar.
- Depois de publicar (`npm run build` + deploy da pasta `dist/`), peça uma
  nova revisão no painel do Google AdSense.
