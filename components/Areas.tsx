const documentos = [
  "Petições iniciais e recursos",
  "Contestações e manifestações",
  "Mandados de segurança",
  "Contratos e pareceres",
  "Análises de caso e memoriais",
];

const areas = [
  { nome: "Administrativo", destaque: true },
  { nome: "Servidor público", destaque: true },
  { nome: "Licitações e contratos", destaque: true },
  { nome: "Previdenciário", destaque: false },
  { nome: "Cível", destaque: false },
  { nome: "Trabalhista", destaque: false },
  { nome: "Família", destaque: false },
  { nome: "Consumidor", destaque: false },
  { nome: "Imobiliário", destaque: false },
  { nome: "Penal", destaque: false },
];

export default function Areas() {
  return (
    <section id="areas" className="py-20">
      <div className="wrap">
        <p className="eyebrow">O que você delega</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-planalto-deep sm:text-4xl">
          Da inicial ao parecer, nas áreas que movem a Justiça do DF.
        </h2>
        <p className="mt-4 max-w-2xl text-cinza">
          Brasília concentra servidores, órgãos públicos e litígios
          administrativos como nenhuma outra cidade do país. A nossa rede foi
          montada para essa realidade, sem abrir mão das áreas do dia a dia de
          qualquer escritório.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-planalto/10 bg-white p-7">
            <h3 className="font-display text-lg font-bold text-planalto-deep">
              Tipos de documento
            </h3>
            <ul className="mt-4 space-y-3">
              {documentos.map((d) => (
                <li key={d} className="flex items-start gap-3 text-grafite">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ipe" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-planalto/10 bg-white p-7">
            <h3 className="font-display text-lg font-bold text-planalto-deep">
              Áreas cobertas
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {areas.map((a) => (
                <span
                  key={a.nome}
                  className={
                    a.destaque
                      ? "rounded-full bg-planalto px-4 py-2 text-sm font-medium text-white"
                      : "rounded-full border border-planalto/20 px-4 py-2 text-sm text-grafite"
                  }
                >
                  {a.nome}
                </span>
              ))}
            </div>
            <p className="mt-5 font-mono text-xs uppercase tracking-widest text-cinza">
              Em azul: as áreas com maior demanda no Distrito Federal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
