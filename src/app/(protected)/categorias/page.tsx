"use client";

import { useState } from "react";

import { DashboardHeader } from "@/src/components/DashboardHeader";
import { SidebarCard } from "@/src/components/SidebarCard";
import { CategoriesCard } from "@/src/components/CategoriesCard";
import { RegisterCategoryModal } from "@/src/components/RegisterCategoryModal";
import { RegisterTransactionModal } from "@/src/components/RegisterTransactionModal";

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

export default function CategoriesPage() {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [categoryToEdit, setCategoryToEdit] =
    useState<CategoryResponse | null>(null);

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

  const handleSubmitTransaction = async (
    data: RegisterTransactionRequest
  ) => {
    try {
      await createTransaction(data);

      showSuccessToast("Transação criada com sucesso!");
      setIsTransactionModalOpen(false);
    } catch (err: any) {
      showErrorToast("Erro ao criar transação: " + err.message);
    }
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-background text-foreground">
      <SidebarCard
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <DashboardHeader
            onMenuClick={() => setIsSidebarOpen(true)}
            title="Categorias"
            subtitle="Organize suas receitas e despesas."
          />

          <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-card-foreground">
                Suas categorias
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Gerencie as categorias utilizadas nas suas movimentações.
              </p>
            </div>

            <CategoriesCard
              categories={categories}
              onDelete={handleDeleteCategory}
              onEdit={(category) => {
                setCategoryToEdit(category);
                setIsCategoryModalOpen(true);
              }}
            />
          </section>
        </div>
      </main>

      {/* Menu de ações */}
      <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3 md:right-6">
        {isActionMenuOpen && (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setIsActionMenuOpen(false);
                setIsTransactionModalOpen(true);
              }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-lg transition hover:bg-secondary"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <svg
                  width="20"
                  height="20"
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
              </span>

              Nova transação
            </button>

            <button
              type="button"
              onClick={() => {
                setIsActionMenuOpen(false);
                setIsCategoryModalOpen(true);
              }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-lg transition hover:bg-secondary"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <svg
                  width="20"
                  height="20"
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
              </span>

              Nova categoria
            </button>
          </div>
        )}

        <button
          type="button"
          aria-label={isActionMenuOpen ? "Fechar ações" : "Abrir ações"}
          aria-expanded={isActionMenuOpen}
          onClick={() => setIsActionMenuOpen((prev) => !prev)}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-105 hover:bg-primary-hover active:scale-95"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${
              isActionMenuOpen ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          >
            <path d="M12 5v14m-7-7h14" />
          </svg>
        </button>
      </div>

      {/* Modal de transação */}
      <RegisterTransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSubmit={handleSubmitTransaction}
        initialData={null}
      />

      {/* Modal de categoria */}
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
