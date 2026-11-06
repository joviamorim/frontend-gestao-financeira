import { CategoryResponse } from "../types/dto/CategoryResponse.dto";

type CategoriesCardProps = {
  categories: CategoryResponse[];
  onDelete: (id: string) => void;
  onEdit: (category: CategoryResponse) => void;
};

export function CategoriesCard({
  categories,
  onEdit,
  onDelete,
}: CategoriesCardProps) {
  const hasCategories =
    Array.isArray(categories) && categories.length > 0;

  return (
    <div>
      {hasCategories ? (
        <div className="divide-y divide-border">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
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
                </div>

                <p className="truncate text-sm font-semibold text-card-foreground sm:text-base">
                  {category.name}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(category)}
                  aria-label={`Editar categoria ${category.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m16 4 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(category.id)}
                  aria-label={`Excluir categoria ${category.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-danger/10 hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11l9 9-7 7-9-9V5.5Z" />
              <circle cx="7.5" cy="7.5" r="1" />
            </svg>
          </div>

          <h3 className="text-base font-semibold text-card-foreground">
            Nenhuma categoria encontrada
          </h3>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Suas categorias aparecerão aqui quando forem cadastradas.
          </p>
        </div>
      )}
    </div>
  );
}
