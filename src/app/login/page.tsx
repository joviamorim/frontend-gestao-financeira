"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthForm } from "@/src/hooks/useAuthForm";
import { useTheme } from "@/src/contexts/ThemeContext";

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const {
    isRegister,
    form,
    loading,
    isDisabled,
    updateField,
    toggleMode,
    handleSubmit,
  } = useAuthForm();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) return null;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 text-foreground">
      {/* Elementos decorativos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />

      {/* Alternância de tema */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={
          theme === "light"
            ? "Ativar tema escuro"
            : "Ativar tema claro"
        }
        title={
          theme === "light"
            ? "Ativar tema escuro"
            : "Ativar tema claro"
        }
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:bg-secondary hover:text-foreground"
      >
        {theme === "light" ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </svg>
        )}
      </button>

      <section className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="M3 10h18M7 15h3" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            FinanceApp
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Organize suas finanças com simplicidade.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-black/5 sm:p-8">
          <div className="mb-7">
            <h2 className="text-xl font-bold text-card-foreground">
              {isRegister ? "Crie sua conta" : "Bem-vindo de volta"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {isRegister
                ? "Preencha seus dados para começar."
                : "Entre com seus dados para acessar sua conta."}
            </p>
          </div>

          {/* Alternância entre login e cadastro */}
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
            <button
              type="button"
              onClick={() => toggleMode(false)}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                !isRegister
                  ? "bg-card text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={() => toggleMode(true)}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                isRegister
                  ? "bg-card text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Cadastrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-card-foreground"
                >
                  Nome
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-card-foreground"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-card-foreground"
              >
                Senha
              </label>

              <input
                id="password"
                type="password"
                autoComplete={
                  isRegister ? "new-password" : "current-password"
                }
                placeholder="Sua senha"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/15 transition hover:bg-primary-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Carregando..."
                : isRegister
                  ? "Criar conta"
                  : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Suas finanças organizadas em um só lugar.
          </p>
        </div>
      </section>
    </main>
  );
}
