import { createClient } from "@/lib/supabase/server";
import { criarPublicacao, marcarPublicacaoLida } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Publicacoes() {
  const supabase = createClient();
  const { data: publicacoes } = await supabase
    .from("publicacoes")
    .select("*")
    .order("lida")
    .order("data_publicacao", { ascending: false });

  const inputCls =
    "mt-1 w-full rounded-lg border border-planalto/20 bg-white px-4 py-3 text-sm outline-none focus:border-planalto";

  return (
    <main>
      <h1 className="font-display text-2xl font-bold text-planalto-deep">
        Publicações
      </h1>
      <p className="mt-1 text-sm text-cinza">
        Intimações e publicações dos seus processos, organizadas em um só lugar.
        O registro é manual por enquanto; a integração automática com o DJEN é o
        próximo passo do roadmap.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-2xl border border-planalto/10 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-planalto-deep">
            Registrar publicação
          </h2>
          <form action={criarPublicacao} className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="orgao" className="text-sm font-medium text-grafite">
                  Órgão
                </label>
                <select id="orgao" name="orgao" className={inputCls}>
                  {["TJDFT", "TRF1", "TRT10", "STJ", "TST", "DJEN"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="dataPublicacao" className="text-sm font-medium text-grafite">
                  Data
                </label>
                <input id="dataPublicacao" name="dataPublicacao" type="date" className={inputCls} />
              </div>
            </div>
            <div>
              <label htmlFor="numeroProcesso" className="text-sm font-medium text-grafite">
                Processo
              </label>
              <input id="numeroProcesso" name="numeroProcesso" className={inputCls} />
            </div>
            <div>
              <label htmlFor="resumo" className="text-sm font-medium text-grafite">
                Resumo da intimação
              </label>
              <textarea id="resumo" name="resumo" rows={3} required className={inputCls} />
            </div>
            <button className="btn-primary w-full">Registrar</button>
          </form>
        </section>

        <section className="rounded-2xl border border-planalto/10 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-planalto-deep">
            Caixa de publicações
          </h2>
          <ul className="mt-4 divide-y divide-planalto/10">
            {(publicacoes ?? []).map((p) => (
              <li key={p.id} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-cinza">
                    {p.orgao}
                    {p.numero_processo ? ` · ${p.numero_processo}` : ""} ·{" "}
                    {new Date(`${p.data_publicacao}T12:00:00`).toLocaleDateString("pt-BR")}
                  </p>
                  <p
                    className={`mt-1 text-sm ${
                      p.lida ? "text-cinza" : "font-medium text-grafite"
                    }`}
                  >
                    {p.resumo}
                  </p>
                </div>
                {!p.lida && (
                  <form action={marcarPublicacaoLida}>
                    <input type="hidden" name="id" value={p.id} />
                    <button className="btn-ghost whitespace-nowrap px-4 py-2 text-xs">
                      Marcar como lida
                    </button>
                  </form>
                )}
              </li>
            ))}
            {(publicacoes ?? []).length === 0 && (
              <li className="py-6 text-sm text-cinza">
                Nenhuma publicação registrada.
              </li>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
