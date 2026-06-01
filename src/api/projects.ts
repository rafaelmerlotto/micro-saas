import type { Project } from "../components/Card";
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
    console.log("Response:", data);
    return data;
}


export async function createProject({ title, short_description, description, stage, tech_stack, looking_for, website, user }: Project): Promise<any> {
    const res = await fetch(`${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        },
        body: JSON.stringify({
            title: title,
            short_description: short_description,
            description: description,
            stage: stage,
            tech_stack: tech_stack,
            looking_for: looking_for,
            website: website,
            user_id: user
        }),
    });
    if (!res.ok) {
        throw new Error("Errore nella risposta");
    }
    return await res.json();
}