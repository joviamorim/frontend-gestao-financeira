"use client";

import { useEffect, useState } from "react";
import { TransactionType } from "@/src/types/enum/TransactionType.enum";
import { RegisterTransactionRequest } from "../types/dto/RegisterTransactionRequest.dto";
import { Category } from "../types/model/Category.model";
import { TransactionResponse } from "../types/dto/TransactionResponse.dto";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RegisterTransactionRequest, id?: string) => void;
  initialData?: TransactionResponse | null;
};

export function RegisterTransactionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const isEditMode = initialData != null;

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: TransactionType.INCOME,
    date: "",
    categoryId: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => setCategories([]));

    if (initialData) {
      return;
    }

    setForm({
      description: "",
      amount: "",
      type: TransactionType.INCOME,
      date: "",
      categoryId: "",
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !initialData || categories.length === 0) return;

    const category = categories.find(
      (c) => c.name === initialData.categoryName
    );

    if (!category) return;

    setForm({
      description: initialData.description,
      amount: initialData.amount.toString(),
      type: initialData.type,
      date: initialData.date.toString().slice(0, 10),
      categoryId: category.id,
    });
  }, [initialData, categories, isOpen]);

  if (!isOpen) return null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit() {
    if (!form.description || !form.amount || !form.categoryId) return;

    const payload: RegisterTransactionRequest = {
      description: form.description,
      amount: Number(form.amount),
      type: form.type,
      date: new Date(form.date),
      categoryId: form.categoryId,
    };

    isEditMode ? onSubmit(payload, initialData.id) : onSubmit(payload);

    setForm({
      description: "",
      amount: "",
      type: TransactionType.INCOME,
      date: "",
      categoryId: "",
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-gray-600">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-indigo-600">
          Nova Transação
        </h2>

        <div className="space-y-4">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value={TransactionType.INCOME}>Receita</option>
            <option value={TransactionType.EXPENSE}>Despesa</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Valor"
            value={form.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
