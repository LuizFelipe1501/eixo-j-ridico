"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Como vocês garantem a qualidade da peça?",
    a: "Cada advogado parceiro passa por um processo seletivo que valida experiência prática na área e conhecimento da jurisprudência local. A peça do seu processo no TJDFT é feita por quem já elaborou dezenas de peças iguais nesse tribunal, e toda entrega passa por revisão antes de chegar até você.",
  },
  {
    q: "Por que um foco específico no Distrito Federal?",
    a: "Porque a advocacia do DF tem características próprias: alto volume de demandas contra o poder público, direito do servidor, licitações e a convivência diária com TJDFT, TRF1, TRT10 e tribunais superiores. Uma rede que domina esse contexto entrega peças com tese mais afinada e menos retrabalho.",
  },
  {
    q: "Qual o volume de peças que vocês entregam?",
    a: "Você delega no seu ritmo: cinco peças em um mês de pico ou um fluxo recorrente de dezenas por semana. A operação escala com a sua demanda sem que você precise contratar, treinar e gerenciar novos advogados internos.",
  },
  {
    q: "A IA substitui o advogado parceiro?",
    a: "Não. Você escolhe o caminho a cada delegação: elaboração por advogado parceiro, elaboração assistida por IA com revisão humana obrigatória, ou os dois combinados. A responsabilidade técnica e o protocolo continuam sempre com o seu escritório.",
  },
  {
    q: "Onde sobra o meu tempo como sócio?",
    a: "Na parte que só você pode fazer: atender cliente, fechar contrato, desenhar tese e posicionar o escritório. Em cinco minutos você delega uma peça que tomaria uma tarde inteira da equipe.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20">
      <div className="wrap grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Perguntas frequentes</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-planalto-deep sm:text-4xl">
            O que escritórios perguntam antes de começar.
          </h2>
        </div>

        <div className="divide-y divide-planalto/10 rounded-2xl border border-planalto/10 bg-white">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-planalto"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-bold text-planalto-deep">
                    {f.q}
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    className={`h-5 w-5 shrink-0 fill-planalto transition-transform ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden="true"
                  >
                    <path d="M9 3h2v6h6v2h-6v6H9v-6H3V9h6z" />
                  </svg>
                </button>
                {isOpen && (
                  <p className="px-6 pb-6 leading-relaxed text-cinza">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
