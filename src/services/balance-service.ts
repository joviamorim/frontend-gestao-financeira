import { env } from "../config/env";
import { BalanceResponse } from "../types/dto/BalanceResponse.dto";

export async function fetchBalance(): Promise<BalanceResponse> {
  const token = localStorage.getItem("token");
  return fetch(`${env.apiUrl}/balance`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
}
