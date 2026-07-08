"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "#plataforma", label: "Plataforma" },
  { href: "#areas", label: "Áreas" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Dúvidas" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-planalto/10 bg-concreto/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2" aria-label="Eixo Jurídico, início">
          <span className="grid h-8 w-8 place-items-center rounded bg-planalto">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M12 2 L12 22 M4 8 L20 8" stroke="#F2B90D" strokeWidth="3" fill="none" />
            </svg>
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-planalto-deep">
            Eixo Jurídico
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-cinza transition-colors hover:text-planalto"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={site.whatsapp} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Falar com um consultor
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-planalto-deep" fill="none" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-planalto/10 bg-concreto md:hidden" aria-label="Menu mobile">
          <div className="wrap flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-sm font-medium text-grafite hover:bg-planalto-soft"
              >
                {l.label}
              </a>
            ))}
            <a href={site.whatsapp} className="btn-primary mt-2" target="_blank" rel="noopener noreferrer">
              Falar com um consultor
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
