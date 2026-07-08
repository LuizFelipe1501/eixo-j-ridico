import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormularioLead from "@/components/FormularioLead";
import { site } from "@/lib/site";

export const metadata = { title: "Contato | Eixo Jurídico" };

export default function Contato() {
  return (
    <>
      <Header />
      <main className="wrap grid gap-10 py-16 md:grid-cols-2">
        <div>
          <p className="eyebrow">Contato</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-planalto-deep">
            Vamos conversar sobre o seu escritório.
          </h1>
          <p className="mt-4 max-w-md leading-relaxed text-cinza">
            Preencha o formulário ou chame direto no WhatsApp. Em trinta
            minutos de conversa mostramos onde a delegação encaixa na sua
            operação.
          </p>
          <div className="mt-8 space-y-2 text-sm">
            <p>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-planalto hover:underline">
                Chamar no WhatsApp
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="text-grafite hover:text-planalto">
                {site.email}
              </a>
            </p>
            <p className="text-cinza">{site.city}</p>
          </div>
        </div>
        <FormularioLead />
      </main>
      <Footer />
    </>
  );
}
