import Link from "next/link";
import { sair } from "@/lib/actions";

const menu = [
  { href: "/painel", label: "Visão geral" },
  { href: "/painel/pecas", label: "Peças" },
  { href: "/painel/prazos", label: "Prazos" },
  { href: "/painel/publicacoes", label: "Publicações" },
  { href: "/painel/configuracoes", label: "Configurações" },
];

export const metadata = { title: "Painel | Eixo Jurídico" };

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-concreto md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-planalto/10 bg-planalto-deep text-white md:border-b-0 md:border-r">
        <div className="flex items-center justify-between p-5 md:block">
          <Link href="/" className="font-display text-lg font-bold">
            Eixo Jurídico
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ipe md:mt-1 md:block">
            painel do escritório
          </span>
        </div>
        <nav
          className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0"
          aria-label="Menu do painel"
        >
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              {m.label}
            </Link>
          ))}
        </nav>
        <form action={sair} className="p-3 md:mt-6">
          <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white">
            Sair
          </button>
        </form>
      </aside>
      <div className="p-5 sm:p-8">{children}</div>
    </div>
  );
}
