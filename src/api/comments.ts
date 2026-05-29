import { commentService } from "./service";


const url: URL = commentService
const token: string | null = localStorage.getItem("token");


export async function getComments(project_id: number): Promise<any> {

    const res = await fetch(`${url}/projects/${project_id}/comments`, {
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
    console.log("Response:", data);
    return data;
}