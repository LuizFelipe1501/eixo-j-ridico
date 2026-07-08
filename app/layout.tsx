import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eixo Jurídico | Delegação de peças para a advocacia do DF",
  description:
    "Delegue petições, recursos e pareceres para advogados validados e IA treinada na prática do TJDFT, TRF1 e TRT10. Feito para escritórios do Distrito Federal.",
  keywords: [
    "delegação de petições",
    "advocacia DF",
    "TJDFT",
    "peças jurídicas Brasília",
    "software jurídico",
    "controle de prazos",
  ],
  openGraph: {
    title: "Eixo Jurídico | Delegação de peças para a advocacia do DF",
    description:
      "Elabore mais peças sem aumentar sua equipe. Inteligência híbrida com foco na Justiça do Distrito Federal.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
