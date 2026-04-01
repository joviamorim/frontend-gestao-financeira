import { useEffect, useState } from "react";
import { TransactionType } from "../types/enum/TransactionType.enum";
import { TransactionResponse } from "../types/dto/TransactionResponse.dto";
import { CategoryResponse } from "../types/dto/CategoryResponse.dto";

export function useTransactionForm(
  isOpen: boolean,
  categories: CategoryResponse[],
  initialData?: TransactionResponse | null
) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: TransactionType.INCOME,
    date: "",
    categoryId: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    if (!initialData) {
      setForm({
        description: "",
        amount: "",
        type: TransactionType.INCOME,
        date: "",
        categoryId: "",
      });
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (!isOpen || !initialData || categories.length === 0) return;

    const category = categories.find(
      (cat) => cat.name === initialData.categoryName
    );

    setForm({
      description: initialData.description,
      amount: initialData.amount.toString(),
      type: initialData.type,
      date: initialData.date.toString().slice(0, 10),
      categoryId: category ? category.id : "",
    });
  }, [isOpen, initialData, categories]);

  return { form, setForm };
}
