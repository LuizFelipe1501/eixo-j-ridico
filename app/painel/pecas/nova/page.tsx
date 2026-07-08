"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { criarPeca } from "@/lib/actions";

const tipos = [
  "Petição inicial",
  "Contestação",
  "Recurso",
  "Mandado de segurança",
  "Manifestação",
  "Parecer",
  "Contrato",
];

const areas = [
  "Administrativo",
  "Servidor público",
  "Licitações e contratos",
  "Cível",
  "Trabalhista",
  "Previdenciário",
  "Família",
  "Consumidor",
  "Penal",
];

const tribunais = ["TJDFT", "TRF1", "TRT10", "STJ", "TST", "Administrativo (órgão)"];

export default function NovaPeca() {
  const router = useRouter();
  const [form, setForm] = useState({
    titulo: "",
    tipo: tipos[0],
    area: areas[0],
    tribunal: tribunais[0],
    numeroProcesso: "",
    fatos: "",
    orientacoes: "",
  });
  const [minuta, setMinuta] = useState("");
  const [gerando, setGerando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  function campo(nome: keyof typeof form) {
    return {
      value: form[nome],
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => setForm({ ...form, [nome]: e.target.value }),
    };
  }

  async function gerarMinuta() {
    setErro("");
    setGerando(true);
    setMinuta("");
    try {
      const res = await fetch("/api/ai/minuta", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok || !res.body) {
        throw new Error((await res.text()) || "Falha ao gerar a minuta.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acumulado = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acumulado += decoder.decode(value, { stream: true });
        setMinuta(acumulado);
      }
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro inesperado ao gerar a minuta.");
    }
    setGerando(false);
  }

  async function salvar() {
    setErro("");
    setSalvando(true);
    const resultado = await criarPeca({ ...form, minuta });
    if ("erro" in resultado && resultado.erro) {
      setErro(resultado.erro);
      setSalvando(false);
      return;
    }
    if ("id" in resultado) {
      router.push(`/painel/pecas/${resultado.id}`);
    }
  }

  const inputCls =
    "mt-1 w-full rounded-lg border border-planalto/20 bg-white px-4 py-3 text-sm outline-none focus:border-planalto";

  return (
    <main>
      <h1 className="font-display text-2xl font-bold text-planalto-deep">
        Delegar nova peça
      </h1>
      <p className="mt-1 text-sm text-cinza">
        Descreva o caso, gere a minuta com IA e salve para acompanhar.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="space-y-4 rounded-2xl border border-planalto/10 bg-white p-6">
          <div>
            <label htmlFor="titulo" className="text-sm font-medium text-grafite">
              Título interno do caso
            </label>
            <input
              id="titulo"
              placeholder="Ex.: Contestação · Condomínio Asa Norte"
              className={inputCls}
              {...campo("titulo")}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="tipo" className="text-sm font-medium text-grafite">
                Tipo de peça
              </label>
              <select id="tipo" className={inputCls} {...campo("tipo")}>
                {tipos.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="area" className="text-sm font-medium text-grafite">
                Área
              </label>
              <select id="area" className={inputCls} {...campo("area")}>
                {areas.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tribunal" className="text-sm font-medium text-grafite">
                Tribunal
              </label>
              <select id="tribunal" className={inputCls} {...campo("tribunal")}>
                {tribunais.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="numeroProcesso" className="text-sm font-medium text-grafite">
              Número do processo (opcional)
            </label>
            <input id="numeroProcesso" className={inputCls} {...campo("numeroProcesso")} />
          </div>

          <div>
            <label htmlFor="fatos" className="text-sm font-medium text-grafite">
              Resumo dos fatos
            </label>
            <textarea id="fatos" rows={5} className={inputCls} {...campo("fatos")} />
          </div>

          <div>
            <label htmlFor="orientacoes" className="text-sm font-medium text-grafite">
              Orientações da tese
            </label>
            <textarea
              id="orientacoes"
              rows={4}
              placeholder="Tese principal, pedidos, tom, precedentes que quer usar..."
              className={inputCls}
              {...campo("orientacoes")}
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={gerarMinuta}
              disabled={gerando}
              className="btn-ipe disabled:opacity-60"
            >
              {gerando ? "Gerando minuta..." : "Gerar minuta com IA"}
            </button>
            <button
              onClick={salvar}
              disabled={salvando || gerando}
              className="btn-primary disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "Salvar peça"}
            </button>
          </div>
          {erro && <p className="text-sm text-red-600">{erro}</p>}
        </section>

        <section className="rounded-2xl border border-planalto/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-planalto-deep">
              Minuta
            </h2>
            <span className="rounded-full bg-ipe-soft px-3 py-1 font-mono text-xs text-grafite">
              revisão por advogado é obrigatória
            </span>
          </div>
          <textarea
            value={minuta}
            onChange={(e) => setMinuta(e.target.value)}
            rows={22}
            placeholder="A minuta gerada pela IA aparece aqui. Você pode editar antes de salvar."
            className="mt-4 w-full rounded-lg border border-planalto/20 bg-concreto p-4 font-mono text-xs leading-relaxed outline-none focus:border-planalto"
          />
        </section>
      </div>
    </main>
  );
}
