export type Comment = {
    id: number;
    content: string;
    user?: {
        email: string;
    };
    project?: {
        id: number;
        title: string;
    };
};