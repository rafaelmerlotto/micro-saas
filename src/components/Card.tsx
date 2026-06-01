import { Bookmark, Ellipsis, Heart, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createComment, deleteComment, getComments } from "../api/comments";
import type { Comment } from "../types/commentType";
import Comments from "./Comments";
import { useForm } from "react-hook-form";
import { useAuth } from "../auth/auth";


export type Project = {
    id: number;
    title: string;
    short_description: string;
    description?: string;
    stage: "idea" | "mvp" | "live" | string;
    tech_stack: any;
    looking_for: string;
    website?: string;
    user?: {
        email: string;
        fullName: string;
        name: string;
        image: string;
    };
};

export default function ProjectCard({ project }: { project: Project }) {

    const { t } = useTranslation();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<Comment>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const { user } = useAuth();


    const onSubmit = async (data: Comment) => {
        setIsSubmitting(true);
        try {
            const newComment = await createComment(data);
            setComments((prev) => [...prev, newComment]);
            setSubmitSuccess(true);

            setTimeout(() => {
                reset();
                setSubmitSuccess(false);
            }, 2000);

        } catch (error) {
            console.error("Errore nell'invio:", error);
        } finally {
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        getComments(project.id).then((res: any) => {
            setTimeout(() => {
                setComments(res);
                setLoading(false);
            }, 500);
        }).catch((err) => {
            console.error("Error fetching comments:", err);
            setLoading(false);
        });
    }, []);


    const handleDelete = (id: number) => {
        setComments((prev) =>
            prev.filter((c) => c.id !== id)
        );
    };


    let bgClass: string = "";
    switch (project.stage) {
        case "idea":
            bgClass = "bg-yellow-100 text-yellow-700";
            break;
        case "mvp":
            bgClass = "bg-blue-100 text-blue-700";
            break;
        case "launched":
            bgClass = "bg-green-100 text-green-700";
            break;
        default:
            bgClass = "bg-gray-100 text-gray-700";
            break;
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 hover:border-gray-300 transition">

            {/* Top */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                {/* User */}
                <div className="flex items-center gap-3">

                    <div className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-xs font-medium text-white ${project.user?.image
                        ? ''
                        : 'bg-gradient-to-br from-blue-600/70 to-cyan-700/70'
                        }`}>
                        {project.user?.image ? (
                            <img
                                src={project.user.image}
                                alt="avatar"
                                className="h-full w-full rounded-full object-cover"
                            />
                        ) : (
                            (project.user?.email?.charAt(0).toUpperCase() || "U")
                        )}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 break-all">
                            {project.user?.fullName || project.user?.name || project.user?.email.split("@")[0]}
                        </span>

                        <small className="text-gray-400 text-xs">
                            3 days ago
                        </small>
                    </div>

                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 self-end sm:self-auto">

                    <span className={`rounded-full ${bgClass} px-3 py-1 text-xs font-medium capitalize whitespace-nowrap`}>
                        {project.stage}
                    </span>

                    <button>
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition" />
                    </button>

                    <button>
                        <Bookmark className="w-5 h-5 text-gray-400 hover:text-black transition" />
                    </button>

                    <button>
                        <Ellipsis className="w-5 h-5 text-gray-400 hover:text-black transition" />
                    </button>

                </div>

            </div>

            {/* Content */}
            <div className="mt-5">

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">
                    {project.title}
                </h3>

                <p className="mt-2 text-sm sm:text-base text-gray-600 break-words">
                    {project.description}
                </p>

            </div>

            {/* Tech stack */}
            <div className="mt-4 flex flex-wrap gap-2">

                {project.tech_stack.map((tech: string) => (
                    <span
                        key={tech}
                        className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
                    >
                        {tech.trim()}
                    </span>
                ))}

            </div>

            {/* Looking for */}
            <div className="mt-4 text-sm text-gray-700 break-words">
                <span className="font-medium text-gray-900">
                    {t("card.looking_for")}
                </span>{" "}
                {project.looking_for}
            </div>

            {/* Website */}
            {project.website && (
                <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-black transition break-all"
                >
                    {t("card.visit_website")}
                    <SquareArrowOutUpRight className="w-4 h-4" />
                </a>
            )}

            {/* Footer */}
            <div className="mt-5 border-t border-gray-100 pt-4">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                    {/* Avatar */}

                    <div className={`hidden sm:flex h-9 w-9 rounded-full ${user?.image ? '' : 'bg-gradient-to-br from-blue-600/80 to-cyan-700/80'} text-white items-center justify-center text-xs font-medium shrink-0`}>
                        {user?.image ? (
                            <img src={user.image} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            user?.email?.charAt(0).toUpperCase() || "U"
                        )}
                    </div>

                    {/* Input */}
                    <input
                        {...register('content', { required: true })}
                        type="text"
                        placeholder={t("card.addComment")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />

                    <input type="text" {...register('user', { required: true })} value={user?.id} className="hidden" />
                    <input type="text" {...register('project', { required: true })} value={project.id} className="hidden" />

                    {/* Button */}
                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className=" sm:w-auto w-1/3 rounded-lg bg-gradient-to-br from-blue-600/70 to-cyan-700/70 hover:from-blue-600/80 hover:to-cyan-700/80 text-white px-4 py-2  md:text-sm text-xs font-medium transition whitespace-nowrap">
                        {t("card.comment")}
                    </button>

                </div>

            </div>

            {/* Comments */}
            <div className="mt-5">
                <Comments comments={comments} loading={loading} projectID={project.id} onDeleteComment={handleDelete} />
            </div>

        </div>
    );
}