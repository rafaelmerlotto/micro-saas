import type { Project } from "../components/Card";
import type { BookmarkResponse } from "../types/bookmarkResponseType";
import type { LikeResponse } from "../types/likeResponseType";
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



export const likeProject = async (projectId: number): Promise<LikeResponse> => {
    const token = localStorage.getItem("token");
    const url = projectService; // Usa la tua config esistente

    const res = await fetch(`${url}/${projectId}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        }
    });

    if (!res.ok) {
        throw new Error("Errore nel like");
    }

    return await res.json();
};

export const unlikeProject = async (projectId: number): Promise<LikeResponse> => {
    const token = localStorage.getItem("token");
    const url = projectService;

    const res = await fetch(`${url}/${projectId}/unlike`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        }
    });

    if (!res.ok) {
        throw new Error("Errore nel unlike");
    }

    return await res.json();
};

export const bookmarkProject = async (projectId: number): Promise<BookmarkResponse> => {
    const token = localStorage.getItem("token");
    const url = projectService;

    const res = await fetch(`${url}/${projectId}/bookmark`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        }
    });

    if (!res.ok) {
        throw new Error("Errore nel bookmark");
    }

    return await res.json();
};

export const unbookmarkProject = async (projectId: number): Promise<BookmarkResponse> => {
    const token = localStorage.getItem("token");
    const url = projectService;

    const res = await fetch(`${url}/${projectId}/unbookmark`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        }
    });

    if (!res.ok) {
        throw new Error("Errore nel unbookmark");
    }

    return await res.json();
};

export const getLikedProjects = async (): Promise<Project[]> => {
    const token = localStorage.getItem("token");
    const url = projectService;

    const res = await fetch(`${url}/projects/liked`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        }
    });

    if (!res.ok) {
        throw new Error("Errore nel recupero progetti liked");
    }

    return await res.json();
};

export const getBookmarkedProjects = async (): Promise<Project[]> => {
    const token = localStorage.getItem("token");
    const url = projectService;

    const res = await fetch(`${url}/projects/bookmarked`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        }
    });

    if (!res.ok) {
        throw new Error("Errore nel recupero progetti bookmarked");
    }

    return await res.json();
};

export const checkIfLiked = async (projectId: number): Promise<boolean> => {
    const token = localStorage.getItem("token");
    const url = projectService;

    const res = await fetch(`${url}/${projectId}/liked`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        }
    });

    if (!res.ok) {
        return false;
    }

    const data = await res.json();
    return data.liked;
};

export const checkIfBookmarked = async (projectId: number): Promise<boolean> => {
    const token = localStorage.getItem("token");
    const url = projectService;

    const res = await fetch(`${url}/${projectId}/bookmarked`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ?? ""
        }
    });

    if (!res.ok) {
        return false;
    }

    const data = await res.json();
    return data.bookmarked;
};

// Get like count for a project
// Se il backend non ha ancora like_count, usa 0 di default
export const getLikeCount = async (projectId: number): Promise<number> => {
    try {
        const res = await fetch(`${url}/${projectId}/like_count`, {
            headers: { "Authorization": token ?? "" }
        });
        if (!res.ok) return 0;
        const data = await res.json();
        return data.like_count;
    } catch {
        return 0; // Fallback
    }
};

export const toggleLike = async (projectId: number, currentlyLiked: boolean): Promise<LikeResponse> => {
    if (currentlyLiked) {
        return await unlikeProject(projectId);
    } else {
        return await likeProject(projectId);
    }
};

export const toggleBookmark = async (projectId: number, currentlyBookmarked: boolean): Promise<BookmarkResponse> => {
    if (currentlyBookmarked) {
        return await unbookmarkProject(projectId);
    } else {
        return await bookmarkProject(projectId);
    }
};