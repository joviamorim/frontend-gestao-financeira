
type Props = {
  expense: number;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function ExpenseCard({ expense }: Props) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Despesas
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-danger sm:text-3xl">
            {currencyFormatter.format(expense)}
          </h2>

          <p className="mt-2 text-xs text-muted-foreground">
            Total acumulado
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger">
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
            <path d="M12 5v14M18 13l-6 6-6-6" />
            <path d="M4 3h16" />
          </svg>
        </div>
      </div>
    </section>
  );
}
