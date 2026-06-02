import type { Comment } from "../types/commentType";
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
        throw new Error("An error occurred while processing the response.");
    }

    const data = await res.json();
    return data.comments;
}


export async function createComment({ content, user, project }: Comment): Promise<any> {
    const res = await fetch(`${url}/projects/${project}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        },
        body: JSON.stringify({
            content: content,
            user_id: user,
            project_id: project
        }),
    });
    if (!res.ok) {
        throw new Error("An error occurred while processing the response.");
    }
    return await res.json();
}


export async function deleteComment(project: number, id: number): Promise<any> {
    const res = await fetch(`${url}/projects/${project}/comments/${id}`, {
        method: "DELETE",
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