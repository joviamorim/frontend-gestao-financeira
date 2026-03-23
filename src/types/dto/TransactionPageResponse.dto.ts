import { TransactionResponse } from "./TransactionResponse.dto";

export interface TransactionPageResponse {
  content: TransactionResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}