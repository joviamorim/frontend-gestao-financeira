import { env } from "../config/env";
import { ApiResponse } from "../types/dto/ApiResponse.dto";
import { BalanceResponse } from "../types/dto/BalanceResponse.dto";

export async function fetchBalance(): Promise<BalanceResponse> {
  const token = localStorage.getItem("token");
  return fetch(`${env.apiUrl}/balance`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(async (res) => {
    const apiRes: ApiResponse<BalanceResponse> = await res.json();
    return apiRes.data;
  });
}
