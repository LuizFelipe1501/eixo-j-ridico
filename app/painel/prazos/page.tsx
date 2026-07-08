import { createClient } from "@/lib/supabase/server";
import { criarPrazo, alternarPrazo } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Prazos() {
  const supabase = createClient();
  const { data: prazos } = await supabase
    .from("prazos")
    .select("*")
    .order("concluido")
    .order("vence_em");

  const hoje = new Date().toISOString().slice(0, 10);
  const inputCls =
    "mt-1 w-full rounded-lg border border-planalto/20 bg-white px-4 py-3 text-sm outline-none focus:border-planalto";

  return (
    <main>
      <h1 className="font-display text-2xl font-bold text-planalto-deep">Prazos</h1>
      <p className="mt-1 text-sm text-cinza">
        Cadastre e acompanhe os prazos processuais do escritório.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-2xl border border-planalto/10 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-planalto-deep">
            Novo prazo
          </h2>
          <form action={criarPrazo} className="mt-4 space-y-4">
            <div>
              <label htmlFor="titulo" className="text-sm font-medium text-grafite">
                Descrição
              </label>
              <input
                id="titulo"
                name="titulo"
                required
                placeholder="Ex.: Contestar ação de cobrança"
                className={inputCls}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="numeroProcesso" className="text-sm font-medium text-grafite">
                  Processo
                </label>
                <input id="numeroProcesso" name="numeroProcesso" className={inputCls} />
              </div>
              <div>
                <label htmlFor="tribunal" className="text-sm font-medium text-grafite">
                  Tribunal
                </label>
                <select id="tribunal" name="tribunal" className={inputCls}>
                  {["TJDFT", "TRF1", "TRT10", "STJ", "TST"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="venceEm" className="text-sm font-medium text-grafite">
                Vencimento
              </label>
              <input id="venceEm" name="venceEm" type="date" required className={inputCls} />
            </div>
            <button className="btn-primary w-full">Cadastrar prazo</button>
          </form>
        </section>

        <section className="rounded-2xl border border-planalto/10 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-planalto-deep">
            Agenda
          </h2>
          <ul className="mt-4 divide-y divide-planalto/10">
            {(prazos ?? []).map((p) => {
              const vencido = !p.concluido && p.vence_em < hoje;
              return (
                <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        p.concluido ? "text-cinza line-through" : "text-grafite"
                      }`}
                    >
                      {p.titulo}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-cinza">
                      {p.tribunal}
                      {p.numero_processo ? ` · ${p.numero_processo}` : ""} ·{" "}
                      <span className={vencido ? "font-semibold text-red-600" : ""}>
                        vence em{" "}
                        {new Date(`${p.vence_em}T12:00:00`).toLocaleDateString("pt-BR")}
                        {vencido ? " (vencido)" : ""}
                      </span>
                    </p>
                  </div>
                  <form action={alternarPrazo}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="concluido" value={String(p.concluido)} />
                    <button className="btn-ghost px-4 py-2 text-xs">
                      {p.concluido ? "Reabrir" : "Concluir"}
                    </button>
                  </form>
                </li>
              );
            })}
            {(prazos ?? []).length === 0 && (
              <li className="py-6 text-sm text-cinza">Nenhum prazo cadastrado.</li>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
