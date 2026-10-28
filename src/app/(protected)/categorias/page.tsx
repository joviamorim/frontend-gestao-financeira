"use client";

import { CategoriesCard } from "@/src/components/CategoriesCard";
import { RegisterCategoryModal } from "@/src/components/RegisterCategoryModal";
import { RegisterTransactionModal } from "@/src/components/RegisterTransactionModal";
import { SidebarCard } from "@/src/components/SidebarCard";
import { showErrorToast, showSuccessToast } from "@/src/helper/toast";
import { useCategoriesData } from "@/src/hooks/useCategoriesData";
import {
  createCategory,
  deleteCategory,
  editCategory,
} from "@/src/services/category-service";
import { createTransaction } from "@/src/services/transaction-service";
import { CategoryResponse } from "@/src/types/dto/CategoryResponse.dto";
import { DeleteCategoryRequest } from "@/src/types/dto/DeleteCategoryRequest.dto";
import { RegisterTransactionRequest } from "@/src/types/dto/RegisterTransactionRequest.dto";
import { useState } from "react";

export default function CategoriesPage() {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryResponse | null>(
    null
  );
  const { categories, fetchCategoryData } = useCategoriesData();

  async function handleDeleteCategory(id: string) {
    const confirmDelete = confirm(
      "Tem certeza que deseja deletar esta categoria?"
    );
    if (!confirmDelete) return;

    try {
      const data: DeleteCategoryRequest = { id };
      await deleteCategory(data);
      showSuccessToast("Categoria deletada com sucesso!");
      fetchCategoryData();
    } catch (err: any) {
      showErrorToast("Erro ao deletar categoria: " + err.message);
    }
  }

  const handleSubmitCategory = async (name: string) => {
    try {
      if (categoryToEdit) {
        await editCategory({
          id: categoryToEdit.id,
          name,
        });

        showSuccessToast("Categoria atualizada com sucesso!");
      } else {
        await createCategory({ name });

        showSuccessToast("Categoria criada com sucesso!");
      }

      setIsCategoryModalOpen(false);
      setCategoryToEdit(null);
      fetchCategoryData();
    } catch (err: any) {
      showErrorToast("Erro ao salvar categoria: " + err.message);
    }
  };

  const handleSubmitTransaction = async (data: RegisterTransactionRequest) => {
    try {
      await createTransaction(data);
      showSuccessToast("Transação criada com sucesso!");
      setIsTransactionModalOpen(false);
    } catch (err: any) {
      showErrorToast("Erro ao criar transação: " + err.message);
    }
  };

  function handleOpenCreate() {
    setIsTransactionModalOpen(true);
  }

  function handleCloseModal() {
    setIsTransactionModalOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden ">
      <button
        className="p-2 md:hidden mb-4 fixed text-indigo-800 text-4xl"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>
      <SidebarCard
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex justify-center py-10 px-4">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-600">Transações</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <CategoriesCard
              categories={categories}
              onDelete={handleDeleteCategory}
              onEdit={(category) => {
                setCategoryToEdit(category);
                setIsCategoryModalOpen(true);
              }}
            />
          </div>
        </div>
      </main>

      <div className="fixed bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-3">
        {isActionMenuOpen && (
          <div className="flex flex-col gap-2 mb-2">
            <button
              className="bg-white text-gray-700 px-4 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition whitespace-nowrap"
              onClick={() => {
                setIsActionMenuOpen(false);
                handleOpenCreate();
              }}
            >
              Nova transação
            </button>

            <button
              className="bg-white text-gray-700 px-4 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition whitespace-nowrap"
              onClick={() => {
                setIsActionMenuOpen(false);
                setCategoryToEdit(null);
                setIsCategoryModalOpen(true);
              }}
            >
              Nova categoria
            </button>
          </div>
        )}

        <button
          className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center text-2xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition"
          onClick={() => setIsActionMenuOpen((prev) => !prev)}
        >
          {isActionMenuOpen ? "x" : "+"}
        </button>
      </div>

      <RegisterTransactionModal
        isOpen={isTransactionModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTransaction}
        initialData={null}
      />

      <RegisterCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setCategoryToEdit(null);
        }}
        onSubmit={handleSubmitCategory}
        initialData={categoryToEdit}
      />
    </div>
  );
}
