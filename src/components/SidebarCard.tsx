import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function SidebarCard({ isOpen, onClose }: Props) {
  const router = useRouter();

  function handleLogout() {
    const confirmLogout = confirm("Deseja realmente sair?");

    if (!confirmLogout) return;

    localStorage.clear();
    router.replace("/login");
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

        <aside
            className={`
                h-screen w-64 bg-white shadow-lg p-6
                flex flex-col
                fixed top-0 left-0 z-50
                transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:static
            `}
        >
        <button
          className="md:hidden mb-4 text-gray-700 text-2xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold text-indigo-600 mb-8">
          FinanceApp
        </h1>

        <nav className="space-y-4">
          <a 
          onClick={() => router.push("/dashboard")}
          className="block text-gray-600 hover:text-indigo-500"
          >
            Dashboard
          </a>
          <a
          onClick={() => router.push("/transacoes")}
          className="block text-gray-600 hover:text-indigo-500"
          >
            Transações
          </a>
        </nav>
        <div className="mt-auto pt-6">
            <button 
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-500 transition"
              onClick={handleLogout}
            >
            Sair
            </button>
        </div>
      </aside>
    </>
  );
}