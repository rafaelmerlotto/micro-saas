import React, { useEffect, useState } from "react";
import ProjectCard, { type Project } from "./Card";
import logo from '../assets/images/logo@.png';
import { useTranslation } from "react-i18next";
import { getProjects } from "../api/projects";
import Modal from "./Modal";
import CreateProject from "./CreateProject";




export default function Feed() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);


    useEffect(() => {

        getProjects().then((res: any) => {
            setTimeout(() => {
                setProjects(res);
                setLoading(false);
            }, 500);
        }).catch((err) => {
            console.error("Error fetching projects:", err);
            setLoading(false);
        });

    }, []);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">

                    <h1 className="md:text-xl text-sm font-bold text-gray-900 flex items-end gap-2">
                        <img src={logo} alt="Logo" className="w-8 md:w-12  transition-opacity duration-500" />
                        MicroSaaS.si
                    </h1>

                    <button onClick={() => setOpen(true)} className="rounded-lg bg-gradient-to-br from-blue-600/70 to-cyan-700/70 hover:from-blue-600/80 hover:to-cyan-700/80 text-white px-4 py-2 md:text-sm text-xs font-medium transition">
                        {t("feed.publish")}
                    </button>

                </div>
            </div>

            {/* Content */}
            <main className="mx-auto max-w-5xl px-6 py-10">

                {/* Title */}
                <div className="mb-10">
                    <h2 className="md:text-3xl text-lg font-bold text-gray-900">
                        {t("feed.discover")}
                    </h2>
                    <p className="text-gray-500 mt-2 md:text-base text-sm">
                        {t("feed.description")}
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-gray-500">
                        {t("feed.loading")}
                    </div>
                )}

                {/* Feed */}
                <div className="space-y-6">

                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}

                </div>

            </main>
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

