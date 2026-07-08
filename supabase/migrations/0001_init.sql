-- Eixo Jurídico · Schema inicial
-- Execute no SQL Editor do Supabase ou via CLI (supabase db push)

-- =========================================================
-- Perfis (1:1 com auth.users)
-- =========================================================
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  nome text not null default '',
  escritorio text not null default '',
  oab text not null default '',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "perfil: ler o próprio" on public.profiles
  for select using (auth.uid() = id);
create policy "perfil: atualizar o próprio" on public.profiles
  for update using (auth.uid() = id);

-- Cria o perfil automaticamente no cadastro
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nome)
  values (new.id, coalesce(new.raw_user_meta_data->>'nome', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================
-- Peças delegadas
-- =========================================================
create table public.pecas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  titulo text not null,
  tipo text not null,
  area text not null,
  tribunal text not null default 'TJDFT',
  numero_processo text not null default '',
  fatos text not null default '',
  orientacoes text not null default '',
  status text not null default 'em_elaboracao'
    check (status in ('rascunho', 'em_elaboracao', 'em_revisao', 'entregue')),
  minuta text not null default '',
  prazo_entrega date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index pecas_user_idx on public.pecas (user_id, created_at desc);

alter table public.pecas enable row level security;

create policy "pecas: crud do dono" on public.pecas
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================================================
-- Mensagens da peça (chat entre escritório, parceiro e IA)
-- =========================================================
create table public.peca_mensagens (
  id uuid primary key default gen_random_uuid(),
  peca_id uuid not null references public.pecas on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  autor text not null default 'escritorio'
    check (autor in ('escritorio', 'parceiro', 'ia')),
  conteudo text not null,
  created_at timestamptz not null default now()
);

create index peca_mensagens_peca_idx on public.peca_mensagens (peca_id, created_at);

alter table public.peca_mensagens enable row level security;

create policy "mensagens: crud do dono" on public.peca_mensagens
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================================================
-- Prazos processuais
-- =========================================================
create table public.prazos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  titulo text not null,
  numero_processo text not null default '',
  tribunal text not null default 'TJDFT',
  vence_em date not null,
  concluido boolean not null default false,
  created_at timestamptz not null default now()
);

create index prazos_user_idx on public.prazos (user_id, vence_em);

alter table public.prazos enable row level security;

create policy "prazos: crud do dono" on public.prazos
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================================================
-- Publicações (intimações organizadas)
-- =========================================================
create table public.publicacoes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  orgao text not null default 'TJDFT',
  numero_processo text not null default '',
  resumo text not null,
  data_publicacao date not null default current_date,
  lida boolean not null default false,
  created_at timestamptz not null default now()
);

create index publicacoes_user_idx on public.publicacoes (user_id, data_publicacao desc);

alter table public.publicacoes enable row level security;

create policy "publicacoes: crud do dono" on public.publicacoes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================================================
-- Leads do site (formulário de contato, sem login)
-- =========================================================
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  telefone text not null default '',
  mensagem text not null default '',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Qualquer visitante pode enviar um lead; ninguém lê pela API pública
create policy "leads: inserir público" on public.leads
  for insert to anon, authenticated with check (true);
