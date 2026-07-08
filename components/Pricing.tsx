import { site } from "@/lib/site";

const plans = [
  {
    name: "Início",
    price: "R$ 109",
    unit: "por peça",
    detail: "2 usuários · adesão de R$ 590",
    highlight: false,
    items: [
      "2 usuários na plataforma",
      "Publicações ilimitadas",
      "Entrega mínima em 5 dias corridos",
      "Suporte por WhatsApp",
    ],
  },
  {
    name: "Ritmo",
    price: "R$ 69",
    unit: "por peça",
    detail: "3 usuários · adesão de R$ 450",
    highlight: true,
    items: [
      "3 usuários na plataforma",
      "Publicações ilimitadas",
      "Entrega mínima em 5 dias corridos",
      "Prioridade na fila de delegação",
      "Suporte por WhatsApp",
    ],
  },
  {
    name: "Escritório",
    price: "R$ 52",
    unit: "por peça",
    detail: "Usuários ilimitados · sem adesão",
    highlight: false,
    items: [
      "Usuários ilimitados",
      "Publicações ilimitadas",
      "Gestor de conta dedicado",
      "Suporte prioritário por WhatsApp",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="planos" className="bg-white py-20">
      <div className="wrap">
        <p className="eyebrow">Planos</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-planalto-deep sm:text-4xl">
          Um plano para cada ritmo de delegação.
        </h2>
        <p className="mt-4 max-w-2xl text-cinza">
          De quem está começando a delegar até operações com demanda recorrente
          alta. Os valores por peça são estimativas médias e variam conforme a
          complexidade.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={
                p.highlight
                  ? "relative rounded-2xl border-2 border-planalto bg-planalto-soft p-7"
                  : "rounded-2xl border border-planalto/10 bg-concreto p-7"
              }
            >
              {p.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-ipe px-3 py-1 font-mono text-xs font-medium text-grafite">
                  mais escolhido
                </span>
              )}
              <h3 className="font-display text-lg font-bold text-planalto-deep">
                {p.name}
              </h3>
              <p className="mt-4 font-display text-4xl font-extrabold text-planalto-deep">
                {p.price}
                <span className="ml-2 text-base font-medium text-cinza">
                  {p.unit}
                </span>
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-cinza">
                {p.detail}
              </p>
              <ul className="mt-6 space-y-3">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-grafite">
                    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 fill-planalto" aria-hidden="true">
                      <path d="M8.1 13.4 4.7 10l-1.2 1.2 4.6 4.6 8.4-8.4-1.2-1.2z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={p.highlight ? "btn-primary mt-7 w-full" : "btn-ghost mt-7 w-full"}
              >
                Conversar sobre este plano
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
