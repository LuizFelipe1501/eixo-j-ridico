import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  rascunho: "Rascunho",
  em_elaboracao: "Em elaboração",
  em_revisao: "Em revisão",
  entregue: "Entregue",
};

export default async function Painel() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: perfil }, { data: pecas }, { data: prazos }, { count: naoLidas }] =
    await Promise.all([
      supabase.from("profiles").select("nome").eq("id", user!.id).single(),
      supabase
        .from("pecas")
        .select("id, titulo, tipo, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("prazos")
        .select("id, titulo, vence_em")
        .eq("concluido", false)
        .order("vence_em")
        .limit(5),
      supabase
        .from("publicacoes")
        .select("id", { count: "exact", head: true })
        .eq("lida", false),
    ]);

  const emAndamento =
    pecas?.filter((p) => p.status !== "entregue").length ?? 0;

  return (
    <main>
      <h1 className="font-display text-2xl font-bold text-planalto-deep">
        {perfil?.nome ? `Olá, ${perfil.nome.split(" ")[0]}` : "Visão geral"}
      </h1>
      <p className="mt-1 text-sm text-cinza">
        O resumo do seu escritório hoje.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-planalto/10 bg-white p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-cinza">
            Peças em andamento
          </p>
          <p className="mt-2 font-display text-4xl font-extrabold text-planalto-deep">
            {emAndamento}
          </p>
        </div>
        <div className="rounded-2xl border border-planalto/10 bg-white p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-cinza">
            Prazos abertos
          </p>
          <p className="mt-2 font-display text-4xl font-extrabold text-planalto-deep">
            {prazos?.length ?? 0}
          </p>
        </div>
        <div className="rounded-2xl border border-planalto/10 bg-white p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-cinza">
            Publicações não lidas
          </p>
          <p className="mt-2 font-display text-4xl font-extrabold text-planalto-deep">
            {naoLidas ?? 0}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-planalto/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-planalto-deep">
              Últimas peças
            </h2>
            <Link href="/painel/pecas/nova" className="btn-primary px-4 py-2 text-xs">
              Delegar peça
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-planalto/10">
            {(pecas ?? []).map((p) => (
              <li key={p.id}>
                <Link
                  href={`/painel/pecas/${p.id}`}
                  className="flex items-center justify-between gap-4 py-3 hover:text-planalto"
                >
                  <span className="text-sm font-medium text-grafite">
                    {p.titulo}
                  </span>
                  <span className="rounded-full bg-planalto-soft px-3 py-1 font-mono text-xs text-planalto">
                    {statusLabel[p.status] ?? p.status}
                  </span>
                </Link>
              </li>
            ))}
            {(pecas ?? []).length === 0 && (
              <li className="py-6 text-sm text-cinza">
                Nenhuma peça ainda. Delegue a primeira para começar.
              </li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-planalto/10 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-planalto-deep">
            Próximos prazos
          </h2>
          <ul className="mt-4 divide-y divide-planalto/10">
            {(prazos ?? []).map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                <span className="text-sm font-medium text-grafite">{p.titulo}</span>
                <span className="font-mono text-xs text-cinza">
                  {new Date(`${p.vence_em}T12:00:00`).toLocaleDateString("pt-BR")}
                </span>
              </li>
            ))}
            {(prazos ?? []).length === 0 && (
              <li className="py-6 text-sm text-cinza">
                Nenhum prazo aberto. Cadastre em Prazos.
              </li>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
