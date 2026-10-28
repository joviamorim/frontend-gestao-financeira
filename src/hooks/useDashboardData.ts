import { useEffect, useState } from "react";
import { TransactionResponse } from "../types/dto/TransactionResponse.dto";
import {
  fetchExpense,
  fetchIncome,
  fetchTransactions,
} from "../services/transaction-service";
import { fetchBalance } from "../services/balance-service";
import { showErrorToast } from "../helper/toast";

export function useDashboardData() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  async function fetchDashboardData() {
    try {
      const [balanceRes, incomeRes, expenseRes, transactionData] =
        await Promise.all([
          fetchBalance(),
          fetchIncome(),
          fetchExpense(),
          fetchTransactions(),
        ]);

      setBalance(balanceRes.balance ?? 0);
      setIncome(incomeRes.totalValue ?? 0);
      setExpense(expenseRes.totalValue ?? 0);
      setTransactions(transactionData);
    } catch (err: any) {
      showErrorToast("Erro ao buscar dados do dashboard");
    }
  }

  async function refetchDashboardData() {
    return fetchDashboardData();
  }

  useEffect(() => {
    refetchDashboardData();
  }, []);

  return { balance, income, expense, transactions, refetchDashboardData };
}
