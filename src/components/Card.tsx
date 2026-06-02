import { Bookmark, Ellipsis, Heart, SquareArrowOutUpRight, Edit, Trash2, Flag } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createComment, deleteComment, getComments } from "../api/comments";
import type { Comment } from "../types/commentType";
import Comments from "./Comments";
import { useForm } from "react-hook-form";
import { useAuth } from "../auth/auth";
import { likeProject, unlikeProject, bookmarkProject, unbookmarkProject, checkIfLiked, checkIfBookmarked, getLikeCount, deleteProject } from "../api/projects";

export type Project = {
    id: number;
    title: string;
    short_description: string;
    description?: string;
    stage: "idea" | "mvp" | "live" | string;
    tech_stack: any;
    looking_for: string;
    website?: string;
    user_id?: number;
    like_count?: number;
    user?: {
        id?: number;
        email: string;
        fullName: string;
        name: string;
        image: string;
    };
};

export default function ProjectCard({ project, onUpdate }: { project: Project; onUpdate?: () => void }) {

    const { t } = useTranslation();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset } = useForm<Comment>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const { user } = useAuth();
    const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likeCount, setLikeCount] = useState(project.like_count || 0);
    const [isLoading, setIsLoading] = useState(false);

    const isCurrentUserOwner = project.user?.id === user?.id || project.user_id === user?.id;

    useEffect(() => {
        if (user) {
            loadInteractionStatus();
        }
    }, [user, project.id]);

    const loadInteractionStatus = async () => {
        try {
            const [liked, bookmarked, count] = await Promise.all([
                checkIfLiked(project.id),
                checkIfBookmarked(project.id),
                getLikeCount(project.id)
            ]);
            setIsLiked(liked);
            setIsBookmarked(bookmarked);
            setLikeCount(count);
        } catch (error) {
            console.error("Error loading interaction status:", error);
        }
    };

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
            console.error("Failed to send:", error);
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
    }, [project.id]);

    const handleDeleteComment = (id: number) => {
        setComments((prev) =>
            prev.filter((c) => c.id !== id)
        );
    };

    const handleLike = async () => {
        if (!user) {
            console.log("You must be logged in to like");
            return;
        }

        setIsLoading(true);
        try {
            if (isLiked) {
                const response = await unlikeProject(project.id);
                setIsLiked(false);
                setLikeCount(response.like_count);
            } else {
                const response = await likeProject(project.id);
                setIsLiked(true);
                setLikeCount(response.like_count);
            }
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Error toggling like:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookmark = async () => {
        if (!user) return;

        setIsLoading(true);
        try {
            if (isBookmarked) {
                await unbookmarkProject(project.id);
                setIsBookmarked(false);
            } else {
                await bookmarkProject(project.id);
                setIsBookmarked(true);
            }
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Error toggling bookmark:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handlers per il dropdown
    const handleEdit = () => {
        console.log("Edit project:", project.id);
    };

    const handleDeleteProject = () => {
        console.log("Delete project:", project.id);
        if (window.confirm("Are you sure you want to delete this project?")) {
            deleteProject(project.id).then(() => {
                console.log("Project deleted");
                if (onUpdate) onUpdate();
            }).catch((err) => {
                console.error("Error deleting project:", err);
            });
        }
    };

    const handleReport = () => {
        console.log("Report project:", project.id);
        const reason = prompt("Why are you reporting this project?");
        if (reason) {
            console.log("Report reason:", reason);
        }
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

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

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

                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className={`rounded-full ${bgClass} px-3 py-1 text-xs font-medium capitalize whitespace-nowrap`}>
                        {project.stage}
                    </span>

                    <button
                        onClick={handleLike}
                        disabled={isLoading}
                        className="flex items-center gap-1 group transition disabled:opacity-50"
                    >
                        <Heart
                            className={`w-5 h-5 transition ${isLiked
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400 group-hover:text-red-500"
                                }`}
                        />
                        {likeCount > 0 && (
                            <span className="text-xs text-gray-500">{likeCount}</span>
                        )}
                    </button>

                    <button
                        onClick={handleBookmark}
                        disabled={isLoading}
                        className="transition disabled:opacity-50"
                    >
                        <Bookmark
                            className={`w-5 h-5 transition ${isBookmarked
                                ? "fill-black text-black"
                                : "text-gray-400 hover:text-black"
                                }`}
                        />
                    </button>

                    <div className="relative">
                        <button onClick={() => setIsEllipsisOpen(!isEllipsisOpen)}>
                            <Ellipsis className="w-5 h-5 text-gray-400 hover:text-black transition" />
                        </button>

                        {isEllipsisOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsEllipsisOpen(false)}
                                />

                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                    {isCurrentUserOwner ? (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setIsEllipsisOpen(false);
                                                    handleEdit();
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                            >
                                                <Edit className="w-4 h-4" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsEllipsisOpen(false);
                                                    handleDeleteProject();
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span>Delete</span>
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setIsEllipsisOpen(false);
                                                handleReport();
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 transition-colors text-left"
                                        >
                                            <Flag className="w-4 h-4" />
                                            <span>Report</span>
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>

            <div className="mt-5">

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">
                    {project.title}
                </h3>

                <p className="mt-2 text-sm sm:text-base text-gray-600 break-words">
                    {project.description}
                </p>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

                {project.tech_stack?.map((tech: string) => (
                    <span
                        key={tech}
                        className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
                    >
                        {tech.trim()}
                    </span>
                ))}

            </div>

            <div className="mt-4 text-sm text-gray-700 break-words">
                <span className="font-medium text-gray-900">
                    {t("card.looking_for")}
                </span>{" "}
                {project.looking_for}
            </div>

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

            <div className="mt-5 border-t border-gray-100 pt-4">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                    <div className={`hidden sm:flex h-9 w-9 rounded-full ${user?.image ? '' : 'bg-gradient-to-br from-blue-600/80 to-cyan-700/80'} text-white items-center justify-center text-xs font-medium shrink-0`}>
                        {user?.image ? (
                            <img src={user.image} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            user?.email?.charAt(0).toUpperCase() || "U"
                        )}
                    </div>

                    <input
                        {...register('content', { required: true })}
                        type="text"
                        placeholder={t("card.addComment")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />

                    <input type="text" {...register('user', { required: true })} value={user?.id} className="hidden" />
                    <input type="text" {...register('project', { required: true })} value={project.id} className="hidden" />

                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="sm:w-auto w-1/3 rounded-lg bg-gradient-to-br from-blue-600/70 to-cyan-700/70 hover:from-blue-600/80 hover:to-cyan-700/80 text-white px-4 py-2 md:text-sm text-xs font-medium transition whitespace-nowrap disabled:opacity-50">
                        {t("card.comment")}
                    </button>

                </div>

            </div>

            <div className="mt-5">
                <Comments comments={comments} loading={loading} projectID={project.id} onDeleteComment={handleDeleteComment} />
            </div>

        </div>
    );
}