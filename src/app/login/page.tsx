"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest, registerRequest } from "@/src/services/auth";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let data;

      if (isRegister) {
        data = await registerRequest(name, email, password);
      } else {
        data = await loginRequest(email, password);
      }

      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch (err) {
      setError(
        isRegister ? "Erro ao cadastrar usuário" : "Email ou senha inválidos"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm text-gray-500">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setIsRegister(false)}
            className={`w-1/2 p-2 text-white ${
              !isRegister ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsRegister(true)}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full mb-3 p-2 border rounded border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Carregando..." : isRegister ? "Cadastrar" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
