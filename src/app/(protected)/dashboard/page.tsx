"use client";

import { useEffect, useState } from "react";
import { SidebarCard } from "@/src/components/SidebarCard";
import { TransactionsCard } from "@/src/components/TransactionsCard";
import { TransactionPageResponse } from "@/src/types/dto/TransactionPageResponse.dto";
import { TransactionResponse } from "@/src/types/dto/TransactionResponse.dto";
import { BalanceCard } from "@/src/components/BalanceCard";
import { IncomeCard } from "@/src/components/IncomeCard";
import { ExpenseCard } from "@/src/components/ExpenseCard";
import { TransactionTotalValueResponse } from "@/src/types/dto/TransactionTotalValueResponse.dto";
import { TransactionType } from "@/src/types/enum/TransactionType.enum";
import { RegisterTransactionModal } from "@/src/components/RegisterTransactionModal";
import {
  createTransaction,
  deleteTransaction,
  editTransaction,
} from "@/src/services/transaction-service";
import { RegisterTransactionRequest } from "@/src/types/dto/RegisterTransactionRequest.dto";
import { DeleteTransactionRequest } from "@/src/types/dto/DeleteTransactionRequest.dto";
import { EditTransactionRequest } from "@/src/types/dto/EditTransactionRequest.dto";

export default function DashboardPage() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionResponse | null>(null);

  async function fetchTransactions() {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: TransactionPageResponse) => {
        const safe = Array.isArray(data?.content) ? data.content : [];
        setTransactions(safe);
      })
      .catch(() => setTransactions([]));
  }

  async function fetchDashboardData() {
    const token = localStorage.getItem("token");

    try {
      const [balanceRes, incomeRes, expenseRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/balance`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/transactions/total-value-by-type?type=INCOME`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/transactions/total-value-by-type?type=EXPENSE`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
      ]);

      const balanceData = await balanceRes.json();
      const incomeData = await incomeRes.json();
      const expenseData = await expenseRes.json();

      setBalance(balanceData.balance ?? 0);
      setIncome(incomeData.totalValue ?? 0);
      setExpense(expenseData.totalValue ?? 0);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBalance(data.balance))
      .catch(() => setBalance(0));

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/total-value-by-type?type=${TransactionType.INCOME}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data: TransactionTotalValueResponse) => setIncome(data.totalValue))
      .catch(() => setIncome(0));

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/total-value-by-type?type=${TransactionType.EXPENSE}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data: TransactionTotalValueResponse) =>
        setExpense(data.totalValue)
      )
      .catch(() => setExpense(0));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: TransactionPageResponse) => {
        const safe = Array.isArray(data?.content) ? data.content : [];
        setTransactions(safe);
      })
      .catch(() => setTransactions([]));
  }, []);

  const handleDeleteTransaction = async (id: string) => {
    const data: DeleteTransactionRequest = { id };
    await deleteTransaction(data);

    fetchTransactions();
    await fetchDashboardData();
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

      setIsModalOpen(false);
      setEditingTransaction(null);

      fetchTransactions();
      await fetchDashboardData();
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
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleSubmitTransaction}
        initialData={editingTransaction}
      />
    </div>
  );
}
