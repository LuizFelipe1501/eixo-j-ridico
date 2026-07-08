import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Platform from "@/components/Platform";
import Areas from "@/components/Areas";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Platform />
        <Areas />
        <HowItWorks />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
