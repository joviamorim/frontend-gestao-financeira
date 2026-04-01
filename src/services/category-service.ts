import { env } from "../config/env";
import { CategoryResponse } from "../types/dto/CategoryResponse.dto";

const token = localStorage.getItem("token");

export async function fetchCategories(): Promise<CategoryResponse[]> {
  try {
    const res = await fetch(`${env.apiUrl}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar categorias");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("fetchCategories error:", error);
    return [];
  }
}
