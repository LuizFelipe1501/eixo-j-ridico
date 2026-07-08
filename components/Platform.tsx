const features = [
  {
    title: "Publicações organizadas",
    text: "Suas intimações do TJDFT, TRF1 e TRT10 chegam classificadas em um painel único, sem limite de processos vinculados à sua OAB.",
    tag: "monitoramento",
  },
  {
    title: "Delegação em um clique",
    text: "Descreva a peça, anexe o processo e escolha quem elabora: advogado parceiro validado ou IA com revisão humana.",
    tag: "delegação",
  },
  {
    title: "Prazos sob controle",
    text: "Calendário que entende prazo processual, prazo em dobro e recesso forense, e avisa a equipe antes do vencimento.",
    tag: "prazos",
  },
  {
    title: "Chat com quem elabora",
    text: "Alinhe tese, tom e detalhes do caso direto com o responsável pela peça, sem depender de e-mail ou telefone.",
    tag: "comunicação",
  },
];

export default function Platform() {
  return (
    <section id="plataforma" className="bg-white py-20">
      <div className="wrap">
        <p className="eyebrow">A plataforma na prática</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-planalto-deep sm:text-4xl">
          Tudo o que o escritório precisa para entregar mais com a mesma folha.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <article
              key={f.title}
              className="group rounded-2xl border border-planalto/10 bg-concreto p-7 transition-colors hover:border-planalto/30"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cinza">
                {f.tag}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-planalto-deep">
                {f.title}
              </h3>
              <p className="mt-3 leading-relaxed text-cinza">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
