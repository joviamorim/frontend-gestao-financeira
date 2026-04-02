"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthForm } from "@/src/hooks/useAuthForm";

export default function LoginPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const {
    isRegister,
    form,
    loading,
    isDisabled,
    updateField,
    toggleMode,
    handleSubmit,
  } = useAuthForm();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) return null;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm text-gray-500">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => toggleMode(false)}
            className={`w-1/2 p-2 text-white ${
              !isRegister ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => toggleMode(true)}
            className={`w-1/2 p-2 text-white ${
              isRegister ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Nome"
              className="w-full mb-3 p-2 border rounded border-gray-300"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded border-gray-300"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full mb-3 p-2 border rounded border-gray-300"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
          />

          <button
            type="submit"
            disabled={isDisabled}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Carregando..." : isRegister ? "Cadastrar" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
