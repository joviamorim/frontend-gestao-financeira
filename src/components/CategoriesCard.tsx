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
  return (
    <>
      <div className="md:hidden space-y-3">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => {
            return (
              <div key={category.id} className="bg-white p-4 rounded-xl shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {category.name}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-indigo-600 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(category.id)}
                    className="text-red-500 text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">
            Nenhuma categoria encontrada.
          </p>
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-left text-gray-700">
              <th className="py-2">Categoria</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category) => {
                return (
                  <tr key={category.id} className="border-t">
                    <td className="py-2 font-semibold text-gray-600">
                      {category.name}
                    </td>

                    <td className="py-2">
                      <div className="flex gap-2">
                        <button onClick={() => onEdit(category)}>✏️</button>
                        <button onClick={() => onDelete(category.id)}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="py-4 text-center" colSpan={5}>
                  Nenhuma categoria encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
