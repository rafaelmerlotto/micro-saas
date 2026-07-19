import React, { useState } from 'react'
import { useAuth } from '../auth/auth';
import { useForm } from 'react-hook-form';
import { createProject } from '../api/projects';
import type { Project } from './Card';
import { useTranslation } from "react-i18next";
import { useNavigate, type NavigateFunction } from 'react-router';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Collaborationrequest } from '../types/collaborationRequestType';
import { createCollaborationRequest } from '../api/collaboration_requests';

type CreateCollaborationRequestProps = {
    setOpen: (value: boolean) => void;
    onCollaborationRequestCreated: (collaborationRequest: Collaborationrequest) => void;
    projectId: number;
};

export default function CreateCollaborationRequest({ setOpen, onCollaborationRequestCreated, projectId }: CreateCollaborationRequestProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Collaborationrequest>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onSubmit = async (data: Collaborationrequest) => {
        setIsSubmitting(true);

        try {
            const collaborationRequestData = {
                ...data,
                user: user!.id,
                project: projectId
            };
            const newCollaborationReques = await createCollaborationRequest(collaborationRequestData);
            onCollaborationRequestCreated(newCollaborationReques);
            reset();
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
                    {t("create_collaboration_request.title")}
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
                            {t("create_collaboration_request.name")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            placeholder={t("create_collaboration_request.title_placeholder")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-500">Title is required</p>
                        )}
                    </div>

                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t("create_collaboration_request.description")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Explain your request in detail..."
                        rows={4}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
                    />
                </div>


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
                            t("create_collaboration_request.send")
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}