import Azulejos from "./Azulejos";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <>
      <section id="contato" className="bg-white py-20">
        <div className="wrap overflow-hidden rounded-3xl bg-planalto-deep text-white">
          <Azulejos cols={16} rows={1} tone="ipe" className="w-full opacity-90" />
          <div className="grid items-center gap-8 p-8 sm:p-12 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Vamos conversar sobre o seu escritório?
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                Trinta minutos para entender a sua operação e mostrar onde a
                delegação encaixa. Diagnóstico direto, sem pressão de venda.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a href={site.whatsapp} className="btn-ipe" target="_blank" rel="noopener noreferrer">
                Chamar no WhatsApp
              </a>
              <a href="#planos" className="btn border border-white/30 text-white hover:bg-white/10">
                Ver planos
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-planalto/10 py-12">
        <div className="wrap grid gap-10 md:grid-cols-[1.2fr_repeat(3,0.6fr)]">
          <div>
            <p className="font-display text-lg font-bold text-planalto-deep">
              Eixo Jurídico
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cinza">
              Conectamos escritórios do Distrito Federal a advogados
              especializados e tecnologia jurídica para elaborar peças com
              precisão e agilidade.
            </p>
          </div>

          <nav aria-label="Produto">
            <p className="font-mono text-xs uppercase tracking-widest text-cinza">Produto</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#plataforma" className="text-grafite hover:text-planalto">Plataforma</a></li>
              <li><a href="#planos" className="text-grafite hover:text-planalto">Planos</a></li>
              <li><a href="#faq" className="text-grafite hover:text-planalto">Dúvidas</a></li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="font-mono text-xs uppercase tracking-widest text-cinza">Legal</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/politica-de-privacidade" className="text-grafite hover:text-planalto">Política de privacidade</a></li>
              <li><a href="/termos-de-uso" className="text-grafite hover:text-planalto">Termos de uso</a></li>
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-cinza">Contato</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href={`mailto:${site.email}`} className="text-grafite hover:text-planalto">{site.email}</a></li>
              <li className="text-cinza">{site.city}</li>
            </ul>
          </div>
        </div>
        <div className="wrap mt-10 border-t border-planalto/10 pt-6">
          <p className="text-xs text-cinza">
            © {new Date().getFullYear()} Eixo Jurídico. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
