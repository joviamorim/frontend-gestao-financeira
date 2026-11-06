"use client";

import { useEffect, useState } from "react";
import { CategoryResponse } from "../types/dto/CategoryResponse.dto";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  initialData?: CategoryResponse | null;
};

export function RegisterCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    } else {
      setName("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  function handleSubmit() {
    if (!name.trim()) return;

    onSubmit(name.trim());
  }

  function handleClose() {
    setName("");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-7"
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
                <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11l9 9-7 7-9-9V5.5Z" />
                <circle cx="7.5" cy="7.5" r="1" />
              </svg>
            </div>

            <h2
              id="category-modal-title"
              className="text-xl font-bold text-foreground"
            >
              {initialData ? "Editar categoria" : "Nova categoria"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Organize suas movimentações por categoria.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar modal"
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div>
          <label
            htmlFor="category-name"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Nome da categoria
          </label>

          <input
            id="category-name"
            type="text"
            name="name"
            placeholder="Ex.: Alimentação"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            {initialData ? "Salvar alterações" : "Criar categoria"}
          </button>
        </div>
      </div>
    </div>
  );
}
