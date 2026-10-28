import { env } from "../config/env";
import { ApiResponse } from "../types/dto/ApiResponse.dto";
import { DeleteTransactionRequest } from "../types/dto/DeleteTransactionRequest.dto";
import { EditTransactionRequest } from "../types/dto/EditTransactionRequest.dto";
import { ExpenseResponse } from "../types/dto/ExpenseResponse.dto";
import { IncomeResponse } from "../types/dto/IncomeResponse.dto";
import { RegisterTransactionRequest } from "../types/dto/RegisterTransactionRequest.dto";
import { TransactionPageResponse } from "../types/dto/TransactionPageResponse.dto";
import { TransactionResponse } from "../types/dto/TransactionResponse.dto";

const token = localStorage.getItem("token");

export async function createTransaction(
  data: RegisterTransactionRequest
): Promise<TransactionResponse> {
  const res = await fetch(`${env.apiUrl}/transactions/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error("Erro ao criar transação: " + errorData.message);
  }

  return res.json();
}

export async function deleteTransaction(
  data: DeleteTransactionRequest
): Promise<TransactionResponse> {
  const res = await fetch(`${env.apiUrl}/transactions/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error("Erro ao deletar transação: " + errorData.message);
  }

  return res.json();
}

export async function editTransaction(
  data: EditTransactionRequest
): Promise<TransactionResponse> {
  const res = await fetch(`${env.apiUrl}/transactions/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error("Erro ao editar transação: " + errorData.message);
  }

  return res.json();
}

export async function fetchTransactions(): Promise<TransactionResponse[]> {
  const res = await fetch(`${env.apiUrl}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error("Erro ao buscar transações: " + errorData.message);
  }
  const data: ApiResponse<TransactionPageResponse> = await res.json();
  const transactionPage = data.data;
  return Array.isArray(transactionPage.content) ? transactionPage.content : [];
}

export async function fetchTransactionsByMonth(
  month: string
): Promise<TransactionResponse[]> {
  return await fetch(
    `${env.apiUrl}/transactions/filter-by-month?month=${month}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then(async (res) => {
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        "Erro ao buscar transações por mês: " + errorData.message
      );
    }
    const apiRes: ApiResponse<TransactionPageResponse> = await res.json();
    const transactionPageResponse = apiRes.data;
    return Array.isArray(transactionPageResponse?.content)
      ? transactionPageResponse.content
      : [];
  });
}

export async function fetchIncome(): Promise<IncomeResponse> {
  return await fetch(
    `${env.apiUrl}/transactions/total-value-by-type?type=INCOME`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  ).then(async (res) => {
    const apiRes: ApiResponse<IncomeResponse> = await res.json();
    return apiRes.data;
  });
}

export async function fetchExpense(): Promise<ExpenseResponse> {
  return await fetch(
    `${env.apiUrl}/transactions/total-value-by-type?type=EXPENSE`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  ).then(async (res) => {
    const apiRes: ApiResponse<ExpenseResponse> = await res.json();
    return apiRes.data;
  });
}
