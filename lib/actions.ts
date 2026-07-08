"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function usuarioAtual() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

// ---------------------------------------------------------
// Peças
// ---------------------------------------------------------
export async function criarPeca(dados: {
  titulo: string;
  tipo: string;
  area: string;
  tribunal: string;
  numeroProcesso: string;
  fatos: string;
  orientacoes: string;
  minuta: string;
}) {
  const { supabase, user } = await usuarioAtual();
  if (!user) return { erro: "Sessão expirada. Entre novamente." };
  if (!dados.titulo.trim()) return { erro: "Dê um título para a peça." };

  const { data, error } = await supabase
    .from("pecas")
    .insert({
      user_id: user.id,
      titulo: dados.titulo.trim(),
      tipo: dados.tipo,
      area: dados.area,
      tribunal: dados.tribunal,
      numero_processo: dados.numeroProcesso.trim(),
      fatos: dados.fatos.trim(),
      orientacoes: dados.orientacoes.trim(),
      minuta: dados.minuta,
      status: dados.minuta ? "em_revisao" : "em_elaboracao",
    })
    .select("id")
    .single();

  if (error) return { erro: "Não foi possível salvar a peça. Tente de novo." };
  revalidatePath("/painel/pecas");
  return { id: data.id as string };
}

export async function atualizarMinuta(pecaId: string, minuta: string) {
  const { supabase, user } = await usuarioAtual();
  if (!user) return { erro: "Sessão expirada." };

  const { error } = await supabase
    .from("pecas")
    .update({ minuta, updated_at: new Date().toISOString() })
    .eq("id", pecaId);

  if (error) return { erro: "Não foi possível salvar a minuta." };
  revalidatePath(`/painel/pecas/${pecaId}`);
  return { ok: true };
}

export async function atualizarStatusPeca(formData: FormData) {
  const { supabase, user } = await usuarioAtual();
  if (!user) return;

  const pecaId = String(formData.get("pecaId"));
  const status = String(formData.get("status"));

  await supabase
    .from("pecas")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", pecaId);

  revalidatePath(`/painel/pecas/${pecaId}`);
  revalidatePath("/painel/pecas");
}

export async function enviarMensagem(formData: FormData) {
  const { supabase, user } = await usuarioAtual();
  if (!user) return;

  const pecaId = String(formData.get("pecaId"));
  const conteudo = String(formData.get("conteudo") ?? "").trim();
  if (!conteudo) return;

  await supabase.from("peca_mensagens").insert({
    peca_id: pecaId,
    user_id: user.id,
    autor: "escritorio",
    conteudo,
  });

  revalidatePath(`/painel/pecas/${pecaId}`);
}

// ---------------------------------------------------------
// Prazos
// ---------------------------------------------------------
export async function criarPrazo(formData: FormData) {
  const { supabase, user } = await usuarioAtual();
  if (!user) return;

  const titulo = String(formData.get("titulo") ?? "").trim();
  const venceEm = String(formData.get("venceEm") ?? "");
  if (!titulo || !venceEm) return;

  await supabase.from("prazos").insert({
    user_id: user.id,
    titulo,
    numero_processo: String(formData.get("numeroProcesso") ?? "").trim(),
    tribunal: String(formData.get("tribunal") ?? "TJDFT"),
    vence_em: venceEm,
  });

  revalidatePath("/painel/prazos");
  revalidatePath("/painel");
}

export async function alternarPrazo(formData: FormData) {
  const { supabase, user } = await usuarioAtual();
  if (!user) return;

  const id = String(formData.get("id"));
  const concluido = String(formData.get("concluido")) === "true";

  await supabase.from("prazos").update({ concluido: !concluido }).eq("id", id);
  revalidatePath("/painel/prazos");
  revalidatePath("/painel");
}

// ---------------------------------------------------------
// Publicações
// ---------------------------------------------------------
export async function criarPublicacao(formData: FormData) {
  const { supabase, user } = await usuarioAtual();
  if (!user) return;

  const resumo = String(formData.get("resumo") ?? "").trim();
  if (!resumo) return;

  await supabase.from("publicacoes").insert({
    user_id: user.id,
    orgao: String(formData.get("orgao") ?? "TJDFT"),
    numero_processo: String(formData.get("numeroProcesso") ?? "").trim(),
    resumo,
    data_publicacao:
      String(formData.get("dataPublicacao") ?? "") ||
      new Date().toISOString().slice(0, 10),
  });

  revalidatePath("/painel/publicacoes");
  revalidatePath("/painel");
}

export async function marcarPublicacaoLida(formData: FormData) {
  const { supabase, user } = await usuarioAtual();
  if (!user) return;

  await supabase
    .from("publicacoes")
    .update({ lida: true })
    .eq("id", String(formData.get("id")));

  revalidatePath("/painel/publicacoes");
  revalidatePath("/painel");
}

// ---------------------------------------------------------
// Perfil e sessão
// ---------------------------------------------------------
export async function atualizarPerfil(formData: FormData) {
  const { supabase, user } = await usuarioAtual();
  if (!user) return;

  await supabase
    .from("profiles")
    .update({
      nome: String(formData.get("nome") ?? "").trim(),
      escritorio: String(formData.get("escritorio") ?? "").trim(),
      oab: String(formData.get("oab") ?? "").trim(),
    })
    .eq("id", user.id);

  revalidatePath("/painel/configuracoes");
}

export async function sair() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/entrar");
}

// ---------------------------------------------------------
// Leads do site público
// ---------------------------------------------------------
export async function enviarLead(formData: FormData) {
  const supabase = createClient();

  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  if (!nome || !email) return { erro: "Preencha nome e e-mail." };

  const { error } = await supabase.from("leads").insert({
    nome,
    email,
    telefone: String(formData.get("telefone") ?? "").trim(),
    mensagem: String(formData.get("mensagem") ?? "").trim(),
  });

  if (error) return { erro: "Não foi possível enviar. Tente de novo." };
  return { ok: true };
}
