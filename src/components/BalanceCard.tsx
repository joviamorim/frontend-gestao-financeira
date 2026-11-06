
type Props = {
  balance: number;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function BalanceCard({ balance }: Props) {
  const isNegative = balance < 0;

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Saldo atual
          </p>

          <h2
            className={`mt-3 text-2xl font-bold tracking-tight sm:text-3xl ${
              isNegative ? "text-danger" : "text-success"
            }`}
          >
            {currencyFormatter.format(balance)}
          </h2>

          <p className="mt-2 text-xs text-muted-foreground">
            Resultado das movimentações
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="6" width="18" height="14" rx="2" />
            <path d="M3 10h18M16 15h2" />
            <path d="M7 6V4h12v2" />
          </svg>
        </div>
      </div>
    </section>
  );
}
