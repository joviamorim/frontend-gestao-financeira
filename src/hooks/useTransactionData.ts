import { useEffect, useState } from "react";
import { TransactionResponse } from "../types/dto/TransactionResponse.dto";
import {
  fetchExpense,
  fetchIncome,
  fetchTransactionsByMonth,
} from "../services/transaction-service";
import { fetchBalance } from "../services/balance-service";
import { showErrorToast } from "../helper/toast";

export function useTransactionData() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  function getMonthParam(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }

  async function fetchMonthTransactions(date: Date) {
    try {
      const month = getMonthParam(date);
      const transactionsData = await fetchTransactionsByMonth(month);
      setTransactions(transactionsData);
    } catch (err: any) {
      showErrorToast("Erro ao buscar transações por mês: " + err.message);
    }
  }

  async function fetchTransactionData() {
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
      showErrorToast("Erro ao buscar dados do dashboard");
    }
  }

  function handlePrevMonth() {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  }

  function handleNextMonth() {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  }

  function refetchTransactionData() {
    fetchTransactionData();
    fetchMonthTransactions(currentDate);
  }

  useEffect(() => {
    refetchTransactionData();
  }, []);

  useEffect(() => {
    fetchMonthTransactions(currentDate);
  }, [currentDate]);

  return {
    balance,
    income,
    expense,
    transactions,
    currentDate,
    refetchTransactionData,
    handlePrevMonth,
    handleNextMonth,
  };
}
