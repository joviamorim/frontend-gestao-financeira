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
import { RegisterTransactionRequest } from "@/src/types/dto/RegisterTransactionRequest.dto";
import { DeleteTransactionRequest } from "@/src/types/dto/DeleteTransactionRequest.dto";
import { EditTransactionRequest } from "@/src/types/dto/EditTransactionRequest.dto";
import { useDashboardData } from "@/src/hooks/useDashboardData";
import { useState } from "react";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionResponse | null>(null);
  const { balance, income, expense, transactions, refetchDashboardData } =
    useDashboardData();

  const handleDeleteTransaction = async (id: string) => {
    const data: DeleteTransactionRequest = { id };
    await deleteTransaction(data);

    refetchDashboardData();
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

      handleCloseModal();
      refetchDashboardData();
    } catch (err) {
      console.error(err);
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

  function handleCloseModal() {
    setIsModalOpen(false);
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

      <button
        className="fixed bottom-6 right-4 md:right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center text-2xl z-50 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition"
        onClick={handleOpenCreate}
      >
        +
      </button>

      <RegisterTransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTransaction}
        initialData={editingTransaction}
      />
    </div>
  );
}
