"use client";

import { useEffect, useState } from "react";
import { BalanceCard } from "@/src/components/BalanceCard"
import { TransactionResponse } from "@/src/types/dto/TransactionResponse.dto";
import { TransactionPageResponse } from "@/src/types/dto/TransactionPageResponse.dto";

export default function DashboardPage() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

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

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/filter-by-month?month=2026-03`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: TransactionPageResponse) => {
        setTransactions(data.content);
      })
      .catch(() => setTransactions([]));
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BalanceCard value={balance} />
      </div>
      <div>
        <h2 className="text-xl font-bold mt-6 mb-4">Transações do Mês</h2>
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Descrição</th>
              <th className="py-2 px-4 border-b">Valor</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="py-2 px-4 border-b">{tx.description}</td>
                <td className="py-2 px-4 border-b">R$ {tx.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}