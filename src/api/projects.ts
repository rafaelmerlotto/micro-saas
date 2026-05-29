import { projectService } from "./service";


const url: URL = projectService
const token: string | null = localStorage.getItem("token");


export async function getProjects(): Promise<any> {

    const res = await fetch(`${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        },
    });
    if (!res.ok) {
        throw new Error("Errore nella risposta");
    }

    const data = await res.json();
    return data;
}