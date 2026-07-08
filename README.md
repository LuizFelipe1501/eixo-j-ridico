# Eixo Jurídico

Landing page de delegação de peças jurídicas com inteligência híbrida, focada na advocacia do Distrito Federal. Construída com Next.js 14 (App Router), TypeScript e Tailwind CSS, pronta para deploy na Vercel.

## Rodar localmente

```bash
npm install
npm run dev
```

O site sobe em http://localhost:3000.

## Publicar no GitHub

```bash
git init
git add .
git commit -m "Site inicial do Eixo Jurídico"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/eixo-juridico.git
git push -u origin main
```

## Deploy na Vercel

1. Acesse https://vercel.com e faça login com a conta do GitHub.
2. Clique em **Add New > Project** e importe o repositório `eixo-juridico`.
3. A Vercel detecta o Next.js automaticamente. Não precisa configurar nada: clique em **Deploy**.
4. Cada `git push` na branch `main` gera um novo deploy automático.

## Personalização rápida

- **Nome da marca, WhatsApp e e-mail:** edite `lib/site.ts`. O número atual é um placeholder (`5561999999999`), troque pelo seu.
- **Cores:** edite `tailwind.config.ts` (tokens `planalto`, `ipe`, `concreto`, `grafite`).
- **Planos e preços:** edite `components/Pricing.tsx`.
- **Áreas e documentos:** edite `components/Areas.tsx`.
- **Perguntas frequentes:** edite `components/Faq.tsx`.
- **Textos legais:** substitua os placeholders em `app/politica-de-privacidade` e `app/termos-de-uso` antes de ir para produção.

## Estrutura

```
app/            páginas (App Router)
components/     seções da landing e elementos visuais
lib/site.ts     constantes da marca e contatos
```
