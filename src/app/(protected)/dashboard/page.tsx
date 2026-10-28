"use client";

import { SidebarCard } from "@/src/components/SidebarCard";
import { TransactionsCard } from "@/src/components/TransactionsCard";
import { TransactionResponse } from "@/src/types/dto/TransactionResponse.dto";
import { BalanceCard } from "@/src/components/BalanceCard";
import { IncomeCard } from "@/src/components/IncomeCard";
import { ExpenseCard } from "@/src/components/ExpenseCard";
import { RegisterTransactionModal } from "@/src/components/RegisterTransactionModal";
import {
  createTransaction,
  deleteTransaction,
  editTransaction,
} from "@/src/services/transaction-service";
import { createCategory } from "@/src/services/category-service";
import { RegisterTransactionRequest } from "@/src/types/dto/RegisterTransactionRequest.dto";
import { DeleteTransactionRequest } from "@/src/types/dto/DeleteTransactionRequest.dto";
import { EditTransactionRequest } from "@/src/types/dto/EditTransactionRequest.dto";
import { useDashboardData } from "@/src/hooks/useDashboardData";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/src/helper/toast";
import { RegisterCategoryModal } from "@/src/components/RegisterCategoryModal";

export default function DashboardPage() {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionResponse | null>(null);
  const { balance, income, expense, transactions, refetchDashboardData } =
    useDashboardData();

  const handleDeleteTransaction = async (id: string) => {
    const confirmDelete = confirm(
      "Tem certeza que deseja deletar esta transação?"
    );
    if (!confirmDelete) return;

    try {
      const data: DeleteTransactionRequest = { id };
      await deleteTransaction(data);
      showSuccessToast("Transação deletada com sucesso!");
      refetchDashboardData();
    } catch (err: any) {
      showErrorToast("Erro ao deletar transação: " + err.message);
    }
  };

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
      handleCloseModal();
      await refetchDashboardData();
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
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
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
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-indigo-600">Dashboard</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <BalanceCard balance={balance} />
            <IncomeCard income={income} />
            <ExpenseCard expense={expense} />
          </div>

          <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">
              Transações Recentes
            </h2>
            <TransactionsCard
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              onEdit={handleOpenEdit}
            />
          </div>
        </div>
      </main>

      <div className="fixed bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-3">
        {isActionMenuOpen && (
          <div className="flex flex-col gap-2 mb-2">
            <button
              className="bg-white text-gray-700 px-4 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition whitespace-nowrap"
              onClick={() => {
                setIsActionMenuOpen(false);
                handleOpenCreate();
              }}
            >
              Nova transação
            </button>

            <button
              className="bg-white text-gray-700 px-4 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition whitespace-nowrap"
              onClick={() => {
                setIsActionMenuOpen(false);
                setIsCategoryModalOpen(true);
              }}
            >
              Nova categoria
            </button>
          </div>
        )}

        <button
          className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center text-2xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition"
          onClick={() => setIsActionMenuOpen((prev) => !prev)}
        >
          {isActionMenuOpen ? "x" : "+"}
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
