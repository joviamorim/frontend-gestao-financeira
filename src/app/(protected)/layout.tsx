"use client";

import { useAuth } from "@/src/hooks/useAuth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return null;
  }

  return <>{children}</>;
}