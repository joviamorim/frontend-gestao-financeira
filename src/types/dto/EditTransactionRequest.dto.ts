import { RegisterTransactionRequest } from "./RegisterTransactionRequest.dto";

type UUID = string;

export interface EditTransactionRequest extends RegisterTransactionRequest{
    id: UUID;
}