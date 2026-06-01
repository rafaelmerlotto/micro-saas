import React, { useEffect, useState } from "react";
import ProjectCard, { type Project } from "./Card";
import logo from "../assets/images/logo@.png";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import CreateProject from "./CreateProject";
import { Search } from "lucide-react";
import { Link } from "react-router";

type Pagination = {
    current_page: number;
    total_pages: number;
    total_count: number;
};

export default function Feed() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState<Pagination | null>(null);

    const fetchProjects = async (term: string, page: number) => {
        try {
            setLoading(true);

            const params = new URLSearchParams({
                "q[title_cont]": term,
                page: page.toString(),
            });

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/projects?${params.toString()}`
            );

            const data = await res.json();

            setProjects(data.projects);
            setPagination(data.pagination);
        } catch (err) {
            console.error("Error fetching projects:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchProjects(search, page);
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, page]);

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}
            <div className="border-b border-gray-200 bg-white/90 backdrop-blur-sm">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">

                    {/* LOGO */}
                    <Link to="/dashboard" className="flex items-center gap-2 group flex-shrink-0">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-6 sm:w-8 md:w-12 transition-all duration-500 group-hover:scale-105"
                        />
                        <h1 className="text-sm md:text-xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                            MicroSaaS.si
                        </h1>
                    </Link>

                    {/* SEARCH DESKTOP */}
                    <div className="hidden md:flex flex-1 max-w-sm mx-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />

                            <input
                                type="text"
                                placeholder={t("feed.search") || "Search projects..."}
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50/50 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* SEARCH MOBILE */}
                    <div className="flex-1 md:hidden">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />

                            <input
                                type="text"
                                placeholder={t("feed.search") || "Search..."}
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50/50 pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={() => setOpen(true)}
                        className="rounded-lg bg-gradient-to-br from-blue-600/70 to-cyan-700/70 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-all hover:scale-105"
                    >
                        {t("feed.publish")}
                    </button>

                </div>
            </div>

            {/* CONTENT */}
            <main className="mx-auto max-w-5xl px-6 py-10">

                {/* TITLE */}
                <div className="mb-10">
                    <h2 className="md:text-3xl text-lg font-bold text-gray-900">
                        {t("feed.discover")}
                    </h2>
                    <p className="text-gray-500 mt-2 md:text-base text-sm">
                        {t("feed.description")}
                    </p>
                </div>

                {/* LOADING */}
                {loading && (
                    <div className="text-gray-500 mb-4">
                        {t("feed.loading")}
                    </div>
                )}

                {/* EMPTY STATE */}
                {!loading && projects.length === 0 && (
                    <div className="text-gray-500">
                        No projects found
                    </div>
                )}

                {/* FEED */}
                <div className="space-y-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* PAGINATION (KAMINARI) */}
                {pagination && (
                    <div className="flex items-center justify-center gap-3 mt-8">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-neutral-600 text-sm transition-all duration-300 hover:bg-white/20 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Prev
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="px-3 py-2 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-sm font-medium min-w-[40px] text-center shadow-md">
                                {pagination.current_page}
                            </span>
                            <span className="text-neutral-500">/</span>
                            <span className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-neutral-600 text-sm font-medium min-w-[40px] text-center">
                                {pagination.total_pages}
                            </span>
                        </div>

                        <button
                            onClick={() =>
                                setPage((p) =>
                                    pagination && p < pagination.total_pages ? p + 1 : p
                                )
                            }
                            disabled={pagination ? page >= pagination.total_pages : true}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-neutral-600 text-sm transition-all duration-300 hover:bg-white/20 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            Next
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}

            </main>

            {/* MODAL */}
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Create Project"
            >
                <CreateProject
                    setOpen={setOpen}
                    onProjectCreated={(project) =>
                        setProjects((prev) => [project, ...prev])
                    }
                />
            </Modal>

        </div>
    );
}