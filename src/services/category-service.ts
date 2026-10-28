import { env } from "../config/env";
import { CategoryResponse } from "../types/dto/CategoryResponse.dto";
import { DeleteCategoryRequest } from "../types/dto/DeleteCategoryRequest.dto";
import { RegisterCategoryRequest } from "../types/dto/RegisterCategoryRequest.dto";
import { EditCategoryRequest } from "../types/dto/EditCategoryRequest.dto";

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
    return Array.isArray(data.data.categories) ? data.data.categories : [];
  } catch (error) {
    console.error("fetchCategories error:", error);
    return [];
  }
}

export async function createCategory(
  data: RegisterCategoryRequest
): Promise<CategoryResponse> {
  const res = await fetch(`${env.apiUrl}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error("Erro ao criar categoria: " + errorData.message);
  }

  return res.json();
}

export async function editCategory(
  data: EditCategoryRequest
): Promise<CategoryResponse> {
  const res = await fetch(`${env.apiUrl}/categories`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error("Erro ao editar categoria: " + errorData.message);
  }

  return res.json();
}

export async function deleteCategory(data: DeleteCategoryRequest) {
  const res = await fetch(`${env.apiUrl}/categories`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error("Erro ao deletar categoria: " + errorData.message);
  }
}
