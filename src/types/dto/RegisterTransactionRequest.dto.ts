import { TransactionType } from "../enum/TransactionType.enum";

type UUID = string;

export interface RegisterTransactionRequest {
  type: TransactionType;
  amount: number;
  description: string;
  date: Date;
  categoryId: UUID;
}
