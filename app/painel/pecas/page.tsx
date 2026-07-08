import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  rascunho: "Rascunho",
  em_elaboracao: "Em elaboração",
  em_revisao: "Em revisão",
  entregue: "Entregue",
};

export default async function Pecas() {
  const supabase = createClient();
  const { data: pecas } = await supabase
    .from("pecas")
    .select("id, titulo, tipo, area, tribunal, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <main>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-planalto-deep">
            Peças
          </h1>
          <p className="mt-1 text-sm text-cinza">
            Todas as peças delegadas pelo escritório.
          </p>
        </div>
        <Link href="/painel/pecas/nova" className="btn-primary">
          Delegar nova peça
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-planalto/10 bg-white">
        {(pecas ?? []).length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-display text-lg font-bold text-planalto-deep">
              Nenhuma peça por aqui ainda.
            </p>
            <p className="mt-2 text-sm text-cinza">
              Delegue a primeira peça e acompanhe tudo neste painel.
            </p>
            <Link href="/painel/pecas/nova" className="btn-ipe mt-6">
              Delegar a primeira peça
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-planalto/10">
            {pecas!.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/painel/pecas/${p.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 hover:bg-planalto-soft/50"
                >
                  <div>
                    <p className="text-sm font-semibold text-grafite">{p.titulo}</p>
                    <p className="mt-1 font-mono text-xs text-cinza">
                      {p.tipo} · {p.area} · {p.tribunal}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-planalto-soft px-3 py-1 font-mono text-xs text-planalto">
                      {statusLabel[p.status] ?? p.status}
                    </span>
                    <span className="font-mono text-xs text-cinza">
                      {new Date(p.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
