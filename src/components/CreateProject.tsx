import React, { useState } from 'react'
import { useAuth } from '../auth/auth';
import { useForm } from 'react-hook-form';
import { createProject } from '../api/projects';
import type { Project } from './Card';
import { useTranslation } from "react-i18next";
import { useNavigate, type NavigateFunction } from 'react-router';
import { X, Plus, Trash2 } from 'lucide-react';

type CreateProjectProps = {
    setOpen: (value: boolean) => void;
    onProjectCreated: (project: Project) => void;
};

export default function CreateProject({ setOpen, onProjectCreated }: CreateProjectProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Project>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [techStackArray, setTechStackArray] = useState<string[]>([]);
    const [currentTech, setCurrentTech] = useState('');
    const { user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleAddTech = () => {
        if (currentTech.trim() && !techStackArray.includes(currentTech.trim())) {
            setTechStackArray([...techStackArray, currentTech.trim()]);
            setCurrentTech('');
        }
    };

    const handleRemoveTech = (tech: string) => {
        setTechStackArray(techStackArray.filter(t => t !== tech));
    };

    const onSubmit = async (data: Project) => {
        setIsSubmitting(true);

        try {
            const projectData = {
                ...data,
                tech_stack: techStackArray
            };
            const newProject = await createProject(projectData);
            onProjectCreated(newProject);
            reset();
            setTechStackArray([]);
            setTimeout(() => {
                setOpen(false);
                navigate("/dashboard");
            }, 800);
        } catch (error) {
            console.error("Error", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-0 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {t("create_project.title")}
                </h2>
                <button
                    onClick={() => setOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("create_project.name")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            placeholder={t("create_project.title_placeholder")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-500">Title is required</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("create_project.stage")} <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("stage", { required: true })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                        >
                            <option value="">{t("create_project.stage_placeholder")}</option>
                            <option value="idea">{t("create_project.stage_idea")}</option>
                            <option value="mvp">{t("create_project.stage_mvp")}</option>
                            <option value="launched">Launched</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("create_project.short_description")}
                        </label>
                        <input
                            {...register("short_description")}
                            type="text"
                            placeholder={t("create_project.short_description_placeholder")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("create_project.description")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Explain your project in detail..."
                        rows={4}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("create_project.tech_stack")} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={currentTech}
                            onChange={(e) => setCurrentTech(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                            placeholder={t("create_project.tech_stack_placeholder")}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        <button
                            type="button"
                            onClick={handleAddTech}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Add</span>
                        </button>
                    </div>

                    {techStackArray.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {techStackArray.map((tech) => (
                                <span
                                    key={tech}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm"
                                >
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTech(tech)}
                                        className="hover:bg-blue-100 rounded-full p-0.5 transition"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("create_project.looking_for")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("looking_for", { required: true })}
                            type="text"
                            placeholder={t("create_project.looking_for_placeholder")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t("create_project.website")}
                        </label>
                        <input
                            {...register("website")}
                            type="url"
                            placeholder={t("create_project.website_placeholder")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                </div>

                <input type="hidden" {...register('user')} value={user?.id} />

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white py-4">
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="order-2 sm:order-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="order-1 sm:order-2 flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-br from-blue-600/70 to-cyan-700/70 hover:from-blue-700/70 hover:to-cyan-700/70 text-white text-sm font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </span>
                        ) : (
                            t("create_project.create")
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}