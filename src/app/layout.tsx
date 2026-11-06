
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/src/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FinanceApp",
    template: "%s | FinanceApp",
  },
  description: "Gerencie suas finanças pessoais com simplicidade.",
};

const themeScript = `
  try {
    const savedTheme = localStorage.getItem("financeapp-theme");
    document.documentElement.dataset.theme =
      savedTheme === "dark" ? "dark" : "light";
  } catch {
    document.documentElement.dataset.theme = "light";
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {children}

          
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--card)",
              color: "var(--card-foreground)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "14px 16px",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.10)",
              maxWidth: "calc(100vw - 32px)",
            },
            success: {
              iconTheme: {
                primary: "var(--success)",
                secondary: "var(--card)",
              },
              style: {
                borderColor: "var(--success)",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--danger)",
                secondary: "var(--card)",
              },
              style: {
                borderColor: "var(--danger)",
              },
            },
          }}
        />

        </ThemeProvider>
      </body>
    </html>
  );
}
