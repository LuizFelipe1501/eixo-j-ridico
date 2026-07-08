import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Política de privacidade | Eixo Jurídico" };

export default function Privacidade() {
  return (
    <>
      <Header />
      <main className="wrap py-16">
        <h1 className="font-display text-3xl font-bold text-planalto-deep">
          Política de privacidade
        </h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-cinza">
          Este é um texto provisório. Substitua pelo conteúdo definitivo da sua
          política de privacidade, alinhado à LGPD, antes de publicar o site em
          produção.
        </p>
      </main>
      <Footer />
    </>
  );
}
