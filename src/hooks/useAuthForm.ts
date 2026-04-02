"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest, registerRequest } from "@/src/services/auth";
import { showErrorToast, showSuccessToast } from "../helper/toast";

export function useAuthForm() {
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleMode(mode: boolean) {
    setIsRegister(mode);
    setForm({ name: "", email: "", password: "" });
  }

  const isDisabled =
    loading || !form.email || !form.password || (isRegister && !form.name);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const data = isRegister
        ? await registerRequest(form.name, form.email, form.password)
        : await loginRequest(form.email, form.password);

      localStorage.setItem("token", data.token);

      showSuccessToast(
        isRegister ? "Cadastro realizado!" : "Login bem-sucedido!"
      );
      router.replace("/dashboard");
      router.refresh();
    } catch (err: any) {
      showErrorToast(
        err?.message ||
          (isRegister
            ? "Erro ao cadastrar usuário"
            : "Email ou senha inválidos")
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    isRegister,
    form,
    loading,
    isDisabled,
    updateField,
    toggleMode,
    handleSubmit,
  };
}
