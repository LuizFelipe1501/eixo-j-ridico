"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Entrar() {
  const router = useRouter();
  const [modo, setModo] = useState<"entrar" | "cadastrar">("entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setAviso("");
    setCarregando(true);
    const supabase = createClient();

    if (modo === "entrar") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });
      if (error) {
        setErro("E-mail ou senha inválidos.");
        setCarregando(false);
        return;
      }
      router.push("/painel");
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: { nome },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      setErro("Não foi possível criar a conta. Verifique os dados.");
      setCarregando(false);
      return;
    }
    setAviso(
      "Conta criada. Se a confirmação por e-mail estiver ativa no projeto, verifique sua caixa de entrada antes de entrar."
    );
    setModo("entrar");
    setCarregando(false);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-concreto px-5 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="font-display text-xl font-bold text-planalto-deep">
          Eixo Jurídico
        </Link>

        <div className="mt-6 rounded-2xl border border-planalto/10 bg-white p-8">
          <h1 className="font-display text-2xl font-bold text-planalto-deep">
            {modo === "entrar" ? "Entrar na plataforma" : "Criar conta"}
          </h1>
          <p className="mt-2 text-sm text-cinza">
            {modo === "entrar"
              ? "Acesse o painel do seu escritório."
              : "Comece a delegar peças em poucos minutos."}
          </p>

          <form onSubmit={enviar} className="mt-6 space-y-4">
            {modo === "cadastrar" && (
              <div>
                <label htmlFor="nome" className="text-sm font-medium text-grafite">
                  Seu nome
                </label>
                <input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-planalto/20 px-4 py-3 text-sm outline-none focus:border-planalto"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-grafite">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-planalto/20 px-4 py-3 text-sm outline-none focus:border-planalto"
              />
            </div>
            <div>
              <label htmlFor="senha" className="text-sm font-medium text-grafite">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={6}
                className="mt-1 w-full rounded-lg border border-planalto/20 px-4 py-3 text-sm outline-none focus:border-planalto"
              />
            </div>

            {erro && <p className="text-sm text-red-600">{erro}</p>}
            {aviso && <p className="text-sm text-planalto">{aviso}</p>}

            <button type="submit" disabled={carregando} className="btn-primary w-full disabled:opacity-60">
              {carregando
                ? "Aguarde..."
                : modo === "entrar"
                  ? "Entrar"
                  : "Criar conta"}
            </button>
          </form>

          <button
            className="mt-4 text-sm font-medium text-planalto underline-offset-4 hover:underline"
            onClick={() => {
              setModo(modo === "entrar" ? "cadastrar" : "entrar");
              setErro("");
              setAviso("");
            }}
          >
            {modo === "entrar"
              ? "Ainda não tem conta? Criar conta"
              : "Já tem conta? Entrar"}
          </button>
        </div>
      </div>
    </main>
  );
}
