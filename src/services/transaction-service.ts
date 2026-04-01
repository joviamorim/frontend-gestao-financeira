import { DeleteTransactionRequest } from "../types/dto/DeleteTransactionRequest.dto";
import { EditTransactionRequest } from "../types/dto/EditTransactionRequest.dto";
import { RegisterTransactionRequest } from "../types/dto/RegisterTransactionRequest.dto";
import { TransactionResponse } from "../types/dto/TransactionResponse.dto";

export async function createTransaction(
  data: RegisterTransactionRequest
): Promise<TransactionResponse> {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao criar transação");
  }

  return res.json();
}

export async function deleteTransaction(
  data: DeleteTransactionRequest
): Promise<TransactionResponse> {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao criar transação");
  }

  return res.json();
}

export async function editTransaction(
  data: EditTransactionRequest
): Promise<TransactionResponse> {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao criar transação");
  }

  return res.json();
}
