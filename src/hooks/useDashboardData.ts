import { useEffect, useState } from "react";
import { TransactionResponse } from "../types/dto/TransactionResponse.dto";
import {
  fetchExpense,
  fetchIncome,
  fetchTransactions,
} from "../services/transaction-service";
import { fetchBalance } from "../services/balance-service";

export function useDashboardData() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  async function fetchAllTransactions() {
    const transactionData = await fetchTransactions();
    setTransactions(transactionData);
  }

  async function fetchDashboardData() {
    try {
      const [balanceRes, incomeRes, expenseRes] = await Promise.all([
        fetchBalance(),
        fetchIncome(),
        fetchExpense(),
      ]);

      setBalance(balanceRes.balance ?? 0);
      setIncome(incomeRes.totalValue ?? 0);
      setExpense(expenseRes.totalValue ?? 0);
    } catch (err) {
      console.error(err);
    }
  }

  async function refetchDashboardData() {
    await Promise.all([fetchDashboardData(), fetchAllTransactions()]);
  }

  useEffect(() => {
    refetchDashboardData();
  }, []);

  return { balance, income, expense, transactions, refetchDashboardData };
}
