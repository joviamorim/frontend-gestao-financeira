import { TransactionResponse } from "../types/dto/TransactionResponse.dto";
import { TransactionType } from "../types/enum/TransactionType.enum";
import { formatDateToString } from "../utils/date";

type TransactionsCardProps = {
  transactions: TransactionResponse[];
  onDelete: (id: string) => void;
  onEdit: (transaction: TransactionResponse, id?: string) => void;
};

export function TransactionsCard({
  transactions,
  onEdit,
  onDelete,
}: TransactionsCardProps) {
  return (
    <>
      <div className="md:hidden space-y-3">
        {Array.isArray(transactions) && transactions.length > 0 ? (
          transactions.map((transaction) => {
            const isIncome = transaction.type === TransactionType.INCOME;

            return (
              <div
                key={transaction.id}
                className="bg-white p-4 rounded-xl shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.categoryName}
                    </p>
                  </div>

                  <p
                    className={`font-bold ${
                      isIncome ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {isIncome ? "R$" : "-R$"} {transaction.amount.toFixed(2)}
                  </p>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  {formatDateToString(transaction.date.toString())}
                </p>

                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="text-indigo-600 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="text-red-500 text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">
            Nenhuma transação encontrada.
          </p>
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-left text-gray-700">
              <th className="py-2">Descrição</th>
              <th className="py-2">Valor</th>
              <th className="py-2">Categoria</th>
              <th className="py-2">Data</th>
              <th className="py-2"></th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(transactions) && transactions.length > 0 ? (
              transactions.map((transaction) => {
                const isIncome = transaction.type === TransactionType.INCOME;

                return (
                  <tr key={transaction.id} className="border-t">
                    <td className="py-2 font-semibold text-gray-600">
                      {transaction.description}
                    </td>

                    <td
                      className={`py-2 font-semibold ${
                        isIncome ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {isIncome ? "R$" : "-R$"} {transaction.amount.toFixed(2)}
                    </td>

                    <td className="py-2 font-semibold text-gray-600">
                      {transaction.categoryName}
                    </td>

                    <td className="py-2 font-semibold text-gray-600">
                      {formatDateToString(transaction.date.toString())}
                    </td>

                    <td className="py-2">
                      <div className="flex gap-2">
                        <button onClick={() => onEdit(transaction)}>✏️</button>
                        <button onClick={() => onDelete(transaction.id)}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="py-4 text-center" colSpan={5}>
                  Nenhuma transação encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
