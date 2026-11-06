
import { TransactionResponse } from "../types/dto/TransactionResponse.dto";
import { TransactionType } from "../types/enum/TransactionType.enum";
import { formatDateToString } from "../utils/date";

type TransactionsCardProps = {
  transactions: TransactionResponse[];
  onDelete: (id: string) => void;
  onEdit: (transaction: TransactionResponse, id?: string) => void;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function TransactionActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onEdit}
        aria-label="Editar transação"
        title="Editar"
        className="rounded-lg p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m16 4 4 4L9 19l-5 1 1-5L16 4Z" />
          <path d="m14 6 4 4" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onDelete}
        aria-label="Excluir transação"
        title="Excluir"
        className="rounded-lg p-2 text-muted-foreground transition hover:bg-danger/10 hover:text-danger"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6" />
          <path d="M10 11v5m4-5v5" />
        </svg>
      </button>
    </div>
  );
}

export function TransactionsCard({
  transactions,
  onEdit,
  onDelete,
}: TransactionsCardProps) {
  const hasTransactions =
    Array.isArray(transactions) && transactions.length > 0;

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            Transações recentes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe suas últimas movimentações
          </p>
        </div>

        {hasTransactions && (
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            {transactions.length} registros
          </span>
        )}
      </div>

      {!hasTransactions ? (
        <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M7 9h10M7 13h6" />
            </svg>
          </div>

          <p className="font-medium text-foreground">
            Nenhuma transação encontrada
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Suas movimentações aparecerão aqui.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile */}
          <div className="divide-y divide-border md:hidden">
            {transactions.map((transaction) => {
              const isIncome =
                transaction.type === TransactionType.INCOME;

              return (
                <div
                  key={transaction.id}
                  className="flex items-center gap-3 px-5 py-4"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isIncome
                        ? "bg-primary-soft text-success"
                        : "bg-danger/10 text-danger"
                    }`}
                  >
                    {isIncome ? (
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
                        <path d="M12 19V5m-6 6 6-6 6 6" />
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
                        <path d="M12 5v14m-6-6 6 6 6-6" />
                      </svg>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {transaction.description}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {transaction.categoryName}
                      </span>
                      <span className="text-muted-foreground/50">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDateToString(transaction.date.toString())}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={`text-sm font-bold ${
                        isIncome ? "text-success" : "text-danger"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {currencyFormatter.format(transaction.amount)}
                    </p>

                    <div className="mt-1 flex justify-end">
                      <TransactionActions
                        onEdit={() => onEdit(transaction)}
                        onDelete={() => onDelete(transaction.id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {transactions.map((transaction) => {
                  const isIncome =
                    transaction.type === TransactionType.INCOME;

                  return (
                    <tr
                      key={transaction.id}
                      className="transition-colors hover:bg-secondary/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              isIncome
                                ? "bg-primary-soft text-success"
                                : "bg-danger/10 text-danger"
                            }`}
                          >
                            {isIncome ? "↗" : "↘"}
                          </div>
                          <span className="max-w-[260px] truncate text-sm font-medium text-foreground">
                            {transaction.description}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                          {transaction.categoryName}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                        {formatDateToString(transaction.date.toString())}
                      </td>

                      <td
                        className={`whitespace-nowrap px-6 py-4 text-right text-sm font-semibold ${
                          isIncome ? "text-success" : "text-danger"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {currencyFormatter.format(transaction.amount)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end">
                          <TransactionActions
                            onEdit={() => onEdit(transaction)}
                            onDelete={() => onDelete(transaction.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
