import { userService } from "./service";


const url: URL = userService
const token: string | null = localStorage.getItem("token");


export async function sign_in(email: string, password: string): Promise<any> {
    const res = await fetch("https://micro-saas-si.onrender.com/api/v1/users/sign_in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ user: { email, password } }),
    });
    if (!res.ok) {
        throw new Error('Login fallito');
    }
    const data = await res.json();
    return data;
}

// Render current user
export async function currentUser(): Promise<any> {

    const res = await fetch(`https://micro-saas-si.onrender.com/users/session`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        },
    });
    if (!res.ok) {
        throw new Error("Errore nella risposta");
    }
    return await res.json();
}