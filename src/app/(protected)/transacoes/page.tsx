"use client";

import { useState } from "react";
import { BalanceCard } from "@/src/components/BalanceCard";
import { ExpenseCard } from "@/src/components/ExpenseCard";
import { IncomeCard } from "@/src/components/IncomeCard";
import { SidebarCard } from "@/src/components/SidebarCard";
import { TransactionsCard } from "@/src/components/TransactionsCard";
import { TransactionResponse } from "@/src/types/dto/TransactionResponse.dto";
import { RegisterTransactionModal } from "@/src/components/RegisterTransactionModal";
import {
  createTransaction,
  deleteTransaction,
  editTransaction,
} from "@/src/services/transaction-service";
import { RegisterTransactionRequest } from "@/src/types/dto/RegisterTransactionRequest.dto";
import { DeleteTransactionRequest } from "@/src/types/dto/DeleteTransactionRequest.dto";
import { EditTransactionRequest } from "@/src/types/dto/EditTransactionRequest.dto";
import { useTransactionData } from "@/src/hooks/useTransactionData";
import { showErrorToast, showSuccessToast } from "@/src/helper/toast";

export default function TransacoesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionResponse | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    balance,
    income,
    expense,
    transactions,
    currentDate,
    refetchTransactionData,
    handlePrevMonth,
    handleNextMonth,
  } = useTransactionData();

  async function handleDeleteTransaction(id: string) {
    const confirmDelete = confirm(
      "Tem certeza que deseja deletar esta transação?"
    );
    if (!confirmDelete) return;

    try {
      const data: DeleteTransactionRequest = { id };
      await deleteTransaction(data);
      showSuccessToast("Transação deletada com sucesso!");
      refetchTransactionData();
    } catch (err: any) {
      showErrorToast("Erro ao deletar transação: " + err.message);
    }
  }

  const handleSubmitTransaction = async (data: RegisterTransactionRequest) => {
    try {
      if (editingTransaction) {
        const editData: EditTransactionRequest = {
          id: editingTransaction.id,
          ...data,
        };
        await editTransaction(editData);
      } else {
        await createTransaction(data);
      }

      showSuccessToast(
        editingTransaction
          ? "Transação editada com sucesso!"
          : "Transação criada com sucesso!"
      );
      setIsModalOpen(false);
      setEditingTransaction(null);
      refetchTransactionData();
    } catch (err: any) {
      showErrorToast(
        editingTransaction
          ? "Erro ao editar transação: " + err.message
          : "Erro ao criar transação: " + err.message
      );
    }
  };

  function handleOpenCreate() {
    setEditingTransaction(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(transaction: TransactionResponse) {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  }

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden ">
      <button
        className="p-2 md:hidden mb-4 fixed text-indigo-800 text-4xl"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>
      <SidebarCard
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex justify-center py-10 px-4">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-600">Transações</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <BalanceCard balance={balance} />
            <IncomeCard income={income} />
            <ExpenseCard expense={expense} />
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="px-3 py-1 bg-indigo-600 rounded"
              >
                ←
              </button>

              <h3 className="text-lg font-semibold text-indigo-600">
                {currentDate.toLocaleDateString("pt-BR", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>

              <button
                onClick={handleNextMonth}
                className="px-3 py-1 bg-indigo-600 rounded"
              >
                →
              </button>
            </div>

            <TransactionsCard
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              onEdit={handleOpenEdit}
            />
          </div>
        </div>
      </main>

      <RegisterTransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleSubmitTransaction}
        initialData={editingTransaction}
      />

      <button
        className="fixed bottom-6 right-4 md:right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center text-2xl z-50 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition"
        onClick={handleOpenCreate}
      >
        +
      </button>
    </div>
  );
}
