import { env } from "../config/env";
import { DeleteTransactionRequest } from "../types/dto/DeleteTransactionRequest.dto";
import { EditTransactionRequest } from "../types/dto/EditTransactionRequest.dto";
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

  const data: TransactionPageResponse = await res.json();
  return Array.isArray(data?.content) ? data.content : [];
}

export async function fetchTransactionsByMonth(
  month: string
): Promise<TransactionResponse[]> {
  const res = await fetch(
    `${env.apiUrl}/transactions/filter-by-month?month=${month}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error("Erro ao buscar transações por mês: " + errorData.message);
  }

  const data: TransactionPageResponse = await res.json();
  return Array.isArray(data?.content) ? data.content : [];
}

export async function fetchIncome(): Promise<{ totalValue: number }> {
  const res = await fetch(
    `${env.apiUrl}/transactions/total-value-by-type?type=INCOME`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.json();
}

export async function fetchExpense(): Promise<{ totalValue: number }> {
  const res = await fetch(
    `${env.apiUrl}/transactions/total-value-by-type?type=EXPENSE`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.json();
}
