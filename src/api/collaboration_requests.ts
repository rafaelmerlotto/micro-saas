import type { Collaborationrequest } from "../types/collaborationRequestType";
import { collaborationRequestService } from "./service";


const url: URL = collaborationRequestService
const token: string | null = localStorage.getItem("token");


export async function getcollaborationRequests(project_id: number): Promise<any> {

    const res = await fetch(`${url}/projects/${project_id}/collaboration_requests`, {
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
    return data;
}


export async function createCollaborationRequest({ title, description, user, project }: Collaborationrequest): Promise<any> {
    const res = await fetch(`${url}/projects/${project}/collaboration_requests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        },
        body: JSON.stringify({
            title: title,
            description: description,
            user_id: user,
            project_id: project
        }),
    });
    if (!res.ok) {
        throw new Error("An error occurred while processing the response.");
    }
    return await res.json();
}


export async function deleteCollaborationRequest(project: number, id: number): Promise<any> {
    const res = await fetch(`${url}/projects/${project}/collaboration_requests/${id}`, {
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