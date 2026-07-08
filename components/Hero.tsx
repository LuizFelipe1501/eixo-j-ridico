import Azulejos from "./Azulejos";
import { site } from "@/lib/site";

const tribunais = ["TJDFT", "TRF1", "TRT10", "STJ", "TST"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="wrap grid items-center gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div>
          <p className="eyebrow">Feito para a advocacia do Distrito Federal</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-planalto-deep sm:text-5xl lg:text-6xl">
            Mais peças no protocolo, sem inchar a sua equipe.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cinza">
            Delegue petições, recursos e pareceres para advogados validados e
            para uma IA treinada na prática dos tribunais que julgam Brasília.
            Você orienta a tese em cinco minutos, nós devolvemos a peça no seu
            padrão.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.whatsapp} className="btn-ipe" target="_blank" rel="noopener noreferrer">
              Falar com um consultor
            </a>
            <a href="#planos" className="btn-ghost">
              Ver planos
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-cinza">
              Cobertura direta:
            </span>
            {tribunais.map((t) => (
              <span key={t} className="font-mono text-sm font-medium text-planalto">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-planalto/10 bg-white shadow-[0_24px_60px_-24px_rgba(12,34,88,0.35)]">
            <Azulejos cols={9} rows={3} className="w-full opacity-95" />
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-bold text-planalto-deep">
                  Peça em elaboração
                </p>
                <span className="rounded-full bg-ipe-soft px-3 py-1 font-mono text-xs text-grafite">
                  entrega em 4 dias
                </span>
              </div>
              <div className="rounded-lg bg-planalto-soft p-4">
                <p className="font-mono text-xs uppercase tracking-widest text-planalto">
                  Contestação · TJDFT · 3ª Vara Cível de Brasília
                </p>
                <p className="mt-2 text-sm text-grafite">
                  Responsável: advogada parceira validada em cível, revisão com
                  IA antes da entrega.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-planalto/10 p-4">
                <span className="h-2 w-2 rounded-full bg-ipe" aria-hidden="true" />
                <p className="text-sm text-cinza">
                  Nova publicação no DJEN vinculada à sua OAB/DF foi organizada
                  no painel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
