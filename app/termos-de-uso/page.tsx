import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Termos de uso | Eixo Jurídico" };

export default function Termos() {
  return (
    <>
      <Header />
      <main className="wrap py-16">
        <h1 className="font-display text-3xl font-bold text-planalto-deep">
          Termos de uso
        </h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-cinza">
          Este é um texto provisório. Substitua pelos termos de uso definitivos
          da plataforma antes de publicar o site em produção.
        </p>
      </main>
      <Footer />
    </>
  );
}
