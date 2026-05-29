import React, { useState } from 'react'
import { useAuth } from '../auth/auth';
import { useForm } from 'react-hook-form';
import { createProject } from '../api/projects';
import type { Project } from './Card';
import { useTranslation } from "react-i18next";


export default function CreateProject() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<Comment>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const { user } = useAuth();
    const { t } = useTranslation();



    const onSubmit = async (data: Project) => {
        setIsSubmitting(true);
        console.log("Submitting project:", data);
        try {
            const newProject = await createProject(data);
            setProjects((prev) => [...prev, newProject]);
            setSubmitSuccess(true);

            setTimeout(() => {
                reset();
                setSubmitSuccess(false);
                navigate("/");
            }, 2000);

        } catch (error) {
            console.error("Errore nell'invio:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-5 border-t border-gray-100 pt-4">

            <div className="space-y-5">

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Project title
                    </label>
                    <input
                        {...register("title", { required: true })}
                        type="text"
                        placeholder="My SaaS idea"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-1 focus:ring-black"
                    />
                </div>

                {/* Stage */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Stage
                    </label>

                    <select
                        {...register("stage", { required: true })}
                        name="stage"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-1 focus:ring-black"
                    >
                        <option value="" className="bg-neutral-900">select</option>
                        <option value="idea" className="bg-neutral-900">idea</option>
                        <option value="mvp" className="bg-neutral-900">mvp</option>
                        <option value="live" className="bg-neutral-900">launched</option>
                    </select>

                </div>

                {/* Short description */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Short description
                    </label>
                    <input
                        {...register("short_description", { required: true })}
                        type="text"
                        placeholder="One line summary"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-1 focus:ring-black"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Description
                    </label>
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Explain your project..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm min-h-[100px] focus:ring-1 focus:ring-black"
                    />
                </div>

                {/* Tech stack */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Tech stack
                    </label>
                    <input
                        {...register("tech_stack", { required: true })}
                        type="text"
                        placeholder="React, Rails, PostgreSQL"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-1 focus:ring-black"
                    />
                </div>

                {/* Looking for */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Looking for
                    </label>
                    <input
                        {...register("looking_for", { required: true })}
                        type="text"
                        placeholder="Co-founder, Dev, Designer..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-1 focus:ring-black"
                    />
                </div>

                {/* Website */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Website
                    </label>
                    <input
                        {...register("website")}
                        type="url"
                        placeholder="https://..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-1 focus:ring-black"
                    />
                </div>

                <input type="text" {...register('user', { required: true })} value={user?.id} className="" />


            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end">

                <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto rounded-lg bg-gradient-to-br from-blue-600/70 to-cyan-700/70 hover:from-blue-600/80 hover:to-cyan-700/80 text-white px-5 py-2 text-sm font-medium transition"
                >
                    {t("createProject.create")}
                </button>

            </div>

        </div >
    )
}
