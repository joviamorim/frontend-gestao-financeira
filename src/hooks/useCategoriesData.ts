import { useEffect, useState } from "react";
import { CategoryResponse } from "../types/dto/CategoryResponse.dto";
import { fetchCategories } from "../services/category-service";
import { showErrorToast } from "../helper/toast";

export function useCategoriesData() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  async function fetchCategoryData() {
    try {
      const [categoriesRes] = await Promise.all([fetchCategories()]);

      setCategories(categoriesRes ?? []);
    } catch (err) {
      showErrorToast("Erro ao buscar categorias");
    }
  }

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return {
    categories,
    fetchCategoryData,
  };
}
