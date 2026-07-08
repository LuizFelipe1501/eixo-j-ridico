import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Azulejos from "@/components/Azulejos";

export const metadata = { title: "Sobre | Eixo Jurídico" };

export default function Sobre() {
  return (
    <>
      <Header />
      <main>
        <section className="wrap py-16">
          <p className="eyebrow">Sobre o Eixo Jurídico</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-planalto-deep sm:text-5xl">
            Nascemos no Plano Piloto para servir a advocacia que move a capital.
          </h1>
          <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5 leading-relaxed text-grafite">
              <p>
                O Distrito Federal concentra uma advocacia diferente de qualquer
                outra do país: ações contra o poder público, direito do
                servidor, licitações, mandados de segurança e a convivência
                diária com o TJDFT, o TRF1, a TRT10 e os tribunais superiores.
                As plataformas nacionais tratam esse cenário como mais um
                mercado. Nós tratamos como o único.
              </p>
              <p>
                O Eixo Jurídico combina uma rede de advogados parceiros
                validados com inteligência artificial treinada na prática
                forense brasileira. O escritório delega a peça, orienta a tese
                em minutos e recebe a minuta no seu padrão, com revisão humana
                obrigatória antes de qualquer protocolo.
              </p>
              <p>
                O nome vem do Eixo Monumental: a via que organiza a cidade e
                conecta os poderes. É o que queremos ser para o seu escritório,
                a estrutura que liga a demanda do cliente à peça protocolada.
              </p>
            </div>
            <Azulejos cols={6} rows={6} className="h-auto w-full rounded-2xl border border-planalto/10 bg-white" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
