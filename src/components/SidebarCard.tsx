"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/src/components/ConfirmDialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "layout",
  },
  {
    label: "Transações",
    href: "/transacoes",
    icon: "transactions",
  },
  {
    label: "Categorias",
    href: "/categorias",
    icon: "categories",
  },
];

function NavIcon({ name }: { name: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "layout":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
      );

    case "transactions":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
          <circle cx="7" cy="7" r="1" fill="currentColor" />
          <circle cx="7" cy="12" r="1" fill="currentColor" />
          <circle cx="7" cy="17" r="1" fill="currentColor" />
        </svg>
      );

    case "categories":
      return (
        <svg {...common}>
          <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11l9 9-7 7-9-9V5.5Z" />
          <circle cx="7.5" cy="7.5" r="1" />
        </svg>
      );

    default:
      return null;
  }
}

export function SidebarCard({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  function handleLogout() {
    setIsLogoutDialogOpen(true);
  }

  function handleConfirmLogout() {
    localStorage.clear();
    router.replace("/login");
  }

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col
          border-r border-border bg-card px-5 py-6
          transition-transform duration-300 ease-in-out
          md:sticky md:top-0 md:h-screen md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="6" width="18" height="14" rx="2" />
                <path d="M3 10h18M7 15h3" />
                <path d="M7 3h10" />
              </svg>
            </div>

            <span className="text-xl font-bold tracking-tight text-foreground">
              Finance<span className="text-primary">App</span>
            </span>
          </Link>

          <button
            type="button"
            aria-label="Fechar menu"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-secondary md:hidden"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </div>

        <nav className="flex flex-col gap-1.5">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={`
                  flex items-center gap-3 rounded-xl px-3 py-3
                  text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-primary-soft text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }
                `}
              >
                <NavIcon name={item.icon} />
                {item.label}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t border-border pt-5">
          <div className="mb-4 rounded-xl bg-secondary p-3">
            <p className="text-sm font-semibold text-foreground">
              Suas finanças,
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              organizadas em um só lugar.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-danger transition hover:bg-danger/10"
          >
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
              <path d="M10 17l5-5-5-5M15 12H3" />
              <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
            </svg>
            Sair da conta
          </button>
        </div>
      </aside>
      <ConfirmDialog
        isOpen={isLogoutDialogOpen}
        title="Deseja sair da sua conta?"
        description="Tem certeza de que deseja encerrar sua sessão?"
        confirmLabel="Sair"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsLogoutDialogOpen(false)}
      />
    </>
  );
}
