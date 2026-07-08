import { createClient } from "@/lib/supabase/server";
import { atualizarPerfil } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Configuracoes() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: perfil } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const inputCls =
    "mt-1 w-full rounded-lg border border-planalto/20 bg-white px-4 py-3 text-sm outline-none focus:border-planalto";

  return (
    <main>
      <h1 className="font-display text-2xl font-bold text-planalto-deep">
        Configurações
      </h1>
      <p className="mt-1 text-sm text-cinza">
        Os dados do perfil são usados no padrão das suas peças.
      </p>

      <section className="mt-6 max-w-xl rounded-2xl border border-planalto/10 bg-white p-6">
        <form action={atualizarPerfil} className="space-y-4">
          <div>
            <label htmlFor="nome" className="text-sm font-medium text-grafite">
              Nome completo
            </label>
            <input id="nome" name="nome" defaultValue={perfil?.nome ?? ""} className={inputCls} />
          </div>
          <div>
            <label htmlFor="escritorio" className="text-sm font-medium text-grafite">
              Nome do escritório
            </label>
            <input
              id="escritorio"
              name="escritorio"
              defaultValue={perfil?.escritorio ?? ""}
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="oab" className="text-sm font-medium text-grafite">
              OAB (ex.: OAB/DF 12345)
            </label>
            <input id="oab" name="oab" defaultValue={perfil?.oab ?? ""} className={inputCls} />
          </div>
          <div>
            <p className="text-sm font-medium text-grafite">E-mail da conta</p>
            <p className="mt-1 rounded-lg bg-concreto px-4 py-3 text-sm text-cinza">
              {user?.email}
            </p>
          </div>
          <button className="btn-primary">Salvar alterações</button>
        </form>
      </section>
    </main>
  );
}
