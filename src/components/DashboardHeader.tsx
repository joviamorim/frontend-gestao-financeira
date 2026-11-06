"use client";

import { useTheme } from "@/src/contexts/ThemeContext";

type Props = {
  onMenuClick: () => void;
  title?: string;
  subtitle?: string;
};

export function DashboardHeader({
  onMenuClick,
  title = "Visão geral",
  subtitle = "Acompanhe e organize suas finanças.",
}: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Abrir menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground transition hover:bg-secondary md:hidden"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
          <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
            {subtitle}
          </p>
        </div>
      </div>

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
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:bg-secondary hover:text-foreground"
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
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </svg>
        )}
      </button>
    </header>
  );
}
