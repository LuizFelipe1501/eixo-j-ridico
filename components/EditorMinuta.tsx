"use client";

import { useState } from "react";
import { atualizarMinuta } from "@/lib/actions";

export default function EditorMinuta({
  pecaId,
  minutaInicial,
}: {
  pecaId: string;
  minutaInicial: string;
}) {
  const [minuta, setMinuta] = useState(minutaInicial ?? "");
  const [salvando, setSalvando] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function salvar() {
    setSalvando(true);
    setFeedback("");
    const resultado = await atualizarMinuta(pecaId, minuta);
    setFeedback(resultado?.erro ?? "Minuta salva.");
    setSalvando(false);
  }

  return (
    <div className="mt-4">
      <textarea
        value={minuta}
        onChange={(e) => setMinuta(e.target.value)}
        rows={20}
        placeholder="Esta peça ainda não tem minuta. Escreva aqui ou gere uma nova na delegação."
        className="w-full rounded-lg border border-planalto/20 bg-concreto p-4 font-mono text-xs leading-relaxed outline-none focus:border-planalto"
      />
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={salvar}
          disabled={salvando}
          className="btn-primary px-5 py-2 text-xs disabled:opacity-60"
        >
          {salvando ? "Salvando..." : "Salvar minuta"}
        </button>
        {feedback && <p className="text-sm text-cinza">{feedback}</p>}
      </div>
    </div>
  );
}
