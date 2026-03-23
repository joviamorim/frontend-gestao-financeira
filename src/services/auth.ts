import { env } from "../config/env";

export async function loginRequest(email: string, password: string) {
    const res = await fetch(`${env.apiUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    });

    if (!res.ok) {
        throw new Error("Erro ao fazer login.");
    }

    return res.json();
}

export async function registerRequest(name: string, email: string, password: string) {
    const res = await fetch(`${env.apiUrl}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password}),
    });


    console.log(res);

    if (!res.ok) {
        throw new Error("Erro no cadastro");
    }

    return res.json();
}