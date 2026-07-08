"use client";

import { useState } from "react";
import { enviarLead } from "@/lib/actions";

export default function FormularioLead() {
  const [status, setStatus] = useState<"parado" | "enviando" | "enviado">("parado");
  const [erro, setErro] = useState("");

  async function enviar(formData: FormData) {
    setErro("");
    setStatus("enviando");
    const resultado = await enviarLead(formData);
    if (resultado?.erro) {
      setErro(resultado.erro);
      setStatus("parado");
      return;
    }
    setStatus("enviado");
  }

  const inputCls =
    "mt-1 w-full rounded-lg border border-planalto/20 bg-white px-4 py-3 text-sm outline-none focus:border-planalto";

  if (status === "enviado") {
    return (
      <div className="rounded-2xl border border-planalto/10 bg-white p-8 text-center">
        <p className="font-display text-xl font-bold text-planalto-deep">
          Recebemos o seu contato.
        </p>
        <p className="mt-2 text-sm text-cinza">
          Um consultor responde em até um dia útil.
        </p>
      </div>
    );
  }

  return (
    <form action={enviar} className="space-y-4 rounded-2xl border border-planalto/10 bg-white p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="text-sm font-medium text-grafite">
            Nome
          </label>
          <input id="nome" name="nome" required className={inputCls} />
        </div>
        <div>
          <label htmlFor="telefone" className="text-sm font-medium text-grafite">
            WhatsApp
          </label>
          <input id="telefone" name="telefone" className={inputCls} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-grafite">
          E-mail
        </label>
        <input id="email" name="email" type="email" required className={inputCls} />
      </div>
      <div>
        <label htmlFor="mensagem" className="text-sm font-medium text-grafite">
          Como podemos ajudar?
        </label>
        <textarea id="mensagem" name="mensagem" rows={4} className={inputCls} />
      </div>
      {erro && <p className="text-sm text-red-600">{erro}</p>}
      <button disabled={status === "enviando"} className="btn-primary w-full disabled:opacity-60">
        {status === "enviando" ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
