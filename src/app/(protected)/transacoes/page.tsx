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
import { RegisterCategoryModal } from "@/src/components/RegisterCategoryModal";
import { createCategory } from "@/src/services/category-service";

export default function TransacoesPage() {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
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
      setIsTransactionModalOpen(false);
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

  const handleSubmitCategory = async (name: string) => {
    try {
      await createCategory({ name });

      showSuccessToast("Categoria criada com sucesso!");

      setIsCategoryModalOpen(false);
    } catch (err: any) {
      showErrorToast("Erro ao criar categoria: " + err.message);
    }
  };

  function handleOpenCreate() {
    setEditingTransaction(null);
    setIsTransactionModalOpen(true);
  }

  function handleOpenEdit(transaction: TransactionResponse) {
    setEditingTransaction(transaction);
    setIsTransactionModalOpen(true);
  }

  function handleCloseModal() {
    setIsTransactionModalOpen(false);
    setEditingTransaction(null);
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

      <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3 md:right-6">
        {isActionMenuOpen && (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setIsActionMenuOpen(false);
                handleOpenCreate();
              }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-lg transition hover:bg-secondary"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
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
                  <path d="M12 5v14m-7-7h14" />
                </svg>
              </span>
              Nova transação
            </button>

            <button
              type="button"
              onClick={() => {
                setIsActionMenuOpen(false);
                setIsCategoryModalOpen(true);
              }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-lg transition hover:bg-secondary"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
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
                  <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11l9 9-7 7-9-9V5.5Z" />
                  <circle cx="7.5" cy="7.5" r="1" />
                </svg>
              </span>
              Nova categoria
            </button>
          </div>
        )}

        <button
          type="button"
          aria-label={isActionMenuOpen ? "Fechar ações" : "Abrir ações"}
          aria-expanded={isActionMenuOpen}
          onClick={() => setIsActionMenuOpen((prev) => !prev)}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary-hover hover:scale-105 active:scale-95"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${
              isActionMenuOpen ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          >
            <path d="M12 5v14m-7-7h14" />
          </svg>
        </button>
      </div>


      <RegisterTransactionModal
        isOpen={isTransactionModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTransaction}
        initialData={editingTransaction}
      />

      <RegisterCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={handleSubmitCategory}
      />
    </div>
  );
}
