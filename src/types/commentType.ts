export type Comment = {
    id: number;
    content: string;
    created_ago: string;

    user?: {
        email: string;
    };
    project?: {
        id: number;
        title: string;
    };
};