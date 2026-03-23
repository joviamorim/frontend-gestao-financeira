import { UUID } from "node:crypto";
import { TransactionType } from "../enum/TransactionType.enum";

export interface TransactionResponse {
  id: UUID;
  transactionType: TransactionType;
  amount: number;
  description: string;
  date: Date;
  categoryName: string;
}