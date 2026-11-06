"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { TransactionType } from "@/src/types/enum/TransactionType.enum";
import { RegisterTransactionRequest } from "../types/dto/RegisterTransactionRequest.dto";
import { TransactionResponse } from "../types/dto/TransactionResponse.dto";
import { useTransactionForm } from "../hooks/useTransactionForm";
import { CategoryResponse } from "../types/dto/CategoryResponse.dto";
import { fetchCategories } from "../services/category-service";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RegisterTransactionRequest, id?: string) => void;
  initialData?: TransactionResponse | null;
};

const fieldClassName =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20";

export function RegisterTransactionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const isEditMode = initialData != null;

  const { form, setForm } = useTransactionForm(
    isOpen,
    categories,
    initialData
  );

  function loadCategories() {
    fetchCategories().then((data) => setCategories(data));
  }

  useEffect(() => {
    if (!isOpen) return;
    loadCategories();
  }, [isOpen]);

  if (!isOpen) return null;

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-7"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14m-7-7h14" />
              </svg>
            </div>

            <h2
              id="transaction-modal-title"
              className="text-xl font-bold text-foreground"
            >
              {isEditMode ? "Editar transação" : "Nova transação"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Preencha os dados da movimentação financeira.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="transaction-type"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Tipo de movimentação
            </label>

            <select
              id="transaction-type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className={fieldClassName}
            >
              <option value={TransactionType.INCOME}>Receita</option>
              <option value={TransactionType.EXPENSE}>Despesa</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="transaction-amount"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Valor
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                R$
              </span>
              <input
                id="transaction-amount"
                type="number"
                name="amount"
                min="0"
                step="0.01"
                placeholder="0,00"
                value={form.amount}
                onChange={handleChange}
                className={`${fieldClassName} pl-12`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="transaction-description"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Descrição
            </label>

            <input
              id="transaction-description"
              type="text"
              name="description"
              placeholder="Ex.: Conta de energia"
              value={form.description}
              onChange={handleChange}
              className={fieldClassName}
            />
          </div>

          <div>
            <label
              htmlFor="transaction-date"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Data
            </label>

            <input
              id="transaction-date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className={fieldClassName}
            />
          </div>

          <div>
            <label
              htmlFor="transaction-category"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Categoria
            </label>

            <select
              id="transaction-category"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className={fieldClassName}
            >
              <option value="">Selecione uma categoria</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            {isEditMode ? "Salvar alterações" : "Criar transação"}
          </button>
        </div>
      </div>
    </div>
  );
}
