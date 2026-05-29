import { Bookmark, Ellipsis, Heart, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getComments } from "../api/comments";
import type { Comment } from "../types/commentType";
import Comments from "./Comments";


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
    };
};

export default function ProjectCard({ project }: { project: Project }) {

    const { t } = useTranslation();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);


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
        <div className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-gray-300 transition">

            {/* Top */}
            <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600/70 to-cyan-700/70 text-white flex items-center justify-center text-xs font-medium">
                        {project.user?.email?.charAt(0).toUpperCase()}
                    </div>
                    {project.user?.email}
                    <small >3 days ago</small>
                </div>

                <div className="flex items-center gap-3">
                    <span className={`rounded-full ${bgClass} px-3 py-1 text-xs font-medium capitalize`}>
                        {project.stage}
                    </span>
                    <Heart className="w-5 h-5 text-gray-400" />
                    <Bookmark className="w-5 h-5 text-gray-400" />
                    <Ellipsis className="w-5 h-5 text-gray-400" />
                </div>

            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-900">
                    {project.title}
                </h3>

                <p className="mt-2 text-gray-600">
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
            <div className="mt-4 text-sm text-gray-700">
                <span className="font-medium text-gray-900">{t("card.looking_for")}</span>{" "}
                {project.looking_for}
            </div>

            {project.website && (
                <a
                    href={project.website}
                    target="_blank"
                    className="text-sm text-gray-600 hover:text-black mt-3 inline-flex items-center gap-1"
                >
                    {t("card.visit_website")} <SquareArrowOutUpRight className="w-4 h-4 inline-block" />
                </a>
            )}

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                <div className="w-full flex gap-3 items-center">
                    <div className="h-8 w-10 rounded-full bg-gradient-to-br from-blue-600/70 to-cyan-700/70 text-white flex items-center justify-center text-xs font-medium">
                        {project.user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <input
                        type="text"
                        placeholder={t("card.addComment")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <button className="rounded-lg bg-gradient-to-br from-blue-600/70 to-cyan-700/70 hover:from-blue-600/80 hover:to-cyan-700/80 text-white px-4 py-2 text-sm font-medium  transition">
                        {t("card.comment")}
                    </button>
                </div>


            </div>
            <Comments comments={comments} loading={loading} />

        </div>
    );
}