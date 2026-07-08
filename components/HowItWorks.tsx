const steps = [
  {
    title: "Configure o padrão do escritório",
    text: "Timbre, formatação e estilo de escrita ficam salvos no perfil. Toda peça sai pronta para protocolar.",
  },
  {
    title: "Cadastre sua OAB/DF",
    text: "As publicações dos seus processos passam a ser monitoradas e organizadas automaticamente.",
  },
  {
    title: "Delegue a peça",
    text: "Escolha entre um advogado parceiro validado ou a elaboração assistida por IA com revisão humana.",
  },
  {
    title: "Oriente em cinco minutos",
    text: "Grave ou escreva as orientações da tese. Depois é acompanhar o andamento e receber no prazo.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-planalto-deep py-20 text-white">
      <div className="wrap">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ipe">
          Como funciona
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Da delegação à peça pronta, um caminho de quatro passos.
        </h2>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <span className="font-mono text-sm text-ipe">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
