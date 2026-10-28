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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-gray-600">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-indigo-600">
          {initialData ? "Editar Categoria" : "Nova Categoria"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nome da categoria"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {initialData ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
