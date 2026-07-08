import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  atualizarStatusPeca,
  enviarMensagem,
} from "@/lib/actions";
import EditorMinuta from "@/components/EditorMinuta";

export const dynamic = "force-dynamic";

const statusOpcoes = [
  ["rascunho", "Rascunho"],
  ["em_elaboracao", "Em elaboração"],
  ["em_revisao", "Em revisão"],
  ["entregue", "Entregue"],
] as const;

export default async function PecaDetalhe({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const [{ data: peca }, { data: mensagens }] = await Promise.all([
    supabase.from("pecas").select("*").eq("id", params.id).single(),
    supabase
      .from("peca_mensagens")
      .select("id, autor, conteudo, created_at")
      .eq("peca_id", params.id)
      .order("created_at"),
  ]);

  if (!peca) notFound();

  return (
    <main>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-planalto-deep">
            {peca.titulo}
          </h1>
          <p className="mt-1 font-mono text-xs text-cinza">
            {peca.tipo} · {peca.area} · {peca.tribunal}
            {peca.numero_processo ? ` · ${peca.numero_processo}` : ""}
          </p>
        </div>

        <form action={atualizarStatusPeca} className="flex items-center gap-2">
          <input type="hidden" name="pecaId" value={peca.id} />
          <label htmlFor="status" className="text-sm text-cinza">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={peca.status}
            className="rounded-lg border border-planalto/20 bg-white px-3 py-2 text-sm"
          >
            {statusOpcoes.map(([valor, rotulo]) => (
              <option key={valor} value={valor}>
                {rotulo}
              </option>
            ))}
          </select>
          <button className="btn-ghost px-4 py-2 text-xs">Atualizar</button>
        </form>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-2xl border border-planalto/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-planalto-deep">
              Minuta
            </h2>
            <span className="rounded-full bg-ipe-soft px-3 py-1 font-mono text-xs text-grafite">
              revise antes de protocolar
            </span>
          </div>
          <EditorMinuta pecaId={peca.id} minutaInicial={peca.minuta} />

          {(peca.fatos || peca.orientacoes) && (
            <details className="mt-6 rounded-lg bg-concreto p-4">
              <summary className="cursor-pointer text-sm font-semibold text-planalto">
                Briefing enviado na delegação
              </summary>
              {peca.fatos && (
                <p className="mt-3 whitespace-pre-wrap text-sm text-grafite">
                  <span className="font-semibold">Fatos: </span>
                  {peca.fatos}
                </p>
              )}
              {peca.orientacoes && (
                <p className="mt-3 whitespace-pre-wrap text-sm text-grafite">
                  <span className="font-semibold">Orientações: </span>
                  {peca.orientacoes}
                </p>
              )}
            </details>
          )}
        </section>

        <section className="flex flex-col rounded-2xl border border-planalto/10 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-planalto-deep">
            Conversa da peça
          </h2>
          <ul className="mt-4 flex-1 space-y-3 overflow-y-auto">
            {(mensagens ?? []).map((m) => (
              <li
                key={m.id}
                className={
                  m.autor === "escritorio"
                    ? "rounded-lg bg-planalto-soft p-3"
                    : "rounded-lg bg-concreto p-3"
                }
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-cinza">
                  {m.autor === "escritorio"
                    ? "Escritório"
                    : m.autor === "ia"
                      ? "IA"
                      : "Parceiro"}{" "}
                  · {new Date(m.created_at).toLocaleString("pt-BR")}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-grafite">
                  {m.conteudo}
                </p>
              </li>
            ))}
            {(mensagens ?? []).length === 0 && (
              <li className="text-sm text-cinza">
                Sem mensagens ainda. Use este espaço para registrar alinhamentos
                sobre a peça.
              </li>
            )}
          </ul>
          <form action={enviarMensagem} className="mt-4 flex gap-2">
            <input type="hidden" name="pecaId" value={peca.id} />
            <input
              name="conteudo"
              placeholder="Escreva uma mensagem..."
              className="w-full rounded-lg border border-planalto/20 px-4 py-3 text-sm outline-none focus:border-planalto"
            />
            <button className="btn-primary px-5">Enviar</button>
          </form>
        </section>
      </div>
    </main>
  );
}
