# Eixo Jurídico

Plataforma de delegação de peças jurídicas com IA, focada na advocacia do Distrito Federal. Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase + API do Google Gemini, pronta para deploy na Vercel.

## O que está incluído

**Site público:** home, /sobre, /contato (formulário salva leads no banco), páginas legais.

**Plataforma (/painel), protegida por login:**
- Dashboard com indicadores (peças em andamento, prazos abertos, publicações não lidas)
- Peças: delegar, gerar minuta com IA (streaming), editar minuta, status e chat por peça
- Prazos: cadastro, agenda com alerta de vencidos, concluir/reabrir
- Publicações: registro e caixa de intimações
- Configurações: perfil do advogado e do escritório

**Banco (Supabase):** tabelas `profiles`, `pecas`, `peca_mensagens`, `prazos`, `publicacoes`, `leads`, todas com Row Level Security. Schema em `supabase/migrations/0001_init.sql`.

**IA:** rota `app/api/ai/minuta/route.ts` chama a API do Google Gemini com prompt focado na prática do TJDFT/TRF1/TRT10 e devolve a minuta em streaming. O modelo é configurável pela variável `GEMINI_MODEL` (padrão: gemini-2.5-flash).

## Configuração (15 minutos)

### 1. Supabase
1. Crie um projeto em https://supabase.com.
2. Abra o SQL Editor e execute o conteúdo de `supabase/migrations/0001_init.sql`.
3. Em Project Settings > API, copie a URL e a chave `anon`.
4. Em Authentication > Providers, confirme que Email está habilitado. Para testar sem e-mail de confirmação, desative "Confirm email" em Authentication > Sign In / Up.

### 2. Google Gemini
1. Crie uma chave gratuita em https://aistudio.google.com/apikey (basta conta Google, o free tier já atende a validação).

### 3. Variáveis de ambiente
Copie `.env.example` para `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
GEMINI_API_KEY=...
```

### 4. Rodar localmente

```bash
npm install
npm run dev
```

## GitHub + Vercel

```bash
git init
git add .
git commit -m "Plataforma Eixo Jurídico"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/eixo-juridico.git
git push -u origin main
```

Na Vercel: **Add New > Project**, importe o repositório e, antes do deploy, adicione as variáveis de ambiente em **Environment Variables**. O `.env.local` nunca vai para o GitHub (já está no .gitignore).

Depois do primeiro deploy, adicione a URL de produção em Supabase > Authentication > URL Configuration (Site URL e Redirect URLs, incluindo `https://SEU_DOMINIO/auth/callback`).

## Personalização

- Marca, WhatsApp e e-mail: `lib/site.ts`
- Cores: `tailwind.config.ts`
- Prompt da IA: `app/api/ai/minuta/route.ts`
- Planos e preços: `components/Pricing.tsx`

## Roadmap sugerido

- Integração automática com o DJEN para puxar publicações pela OAB
- Chat com a IA para revisar e ajustar minutas já salvas
- Exportação da minuta em .docx com o timbre do escritório
- Papéis de acesso (sócio, associado, estagiário) por escritório
- Pagamentos por peça (Stripe ou Mercado Pago)
