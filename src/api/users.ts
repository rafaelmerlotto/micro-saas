import { userService } from "./service";


const url: URL = userService
const token: string | null = localStorage.getItem("token");


export async function sign_in(email: string, password: string): Promise<any> {
    const res = await fetch(`${url}/sign_in`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ user: { email, password } }),
    });
    if (!res.ok) {
        throw new Error('Login failed.');
    }
    const data = await res.json();
    return data;
}

export async function sign_up(email: string, password: string, fullName: string): Promise<any> {
    const res = await fetch(`${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ user: { email, password, fullName } }),
    });
    if (!res.ok) {
        throw new Error('Reistration failed.');
    }
    const data = await res.json();
    return data;
}

// Render current user
export async function currentUser(): Promise<any> {

    const res = await fetch(`${url}/session`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        },
    });
    if (!res.ok) {
        throw new Error("An error occurred while processing the response.");
    }
    return await res.json();
}


export async function userProjects(userId: number): Promise<any> {

    const res = await fetch(`${url}/${userId}/projects`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        },
    });
    if (!res.ok) {
        throw new Error("An error occurred while processing the response.");
    }
    return await res.json();
}
