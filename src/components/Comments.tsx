import React from 'react'
import type { Comment } from '../types/commentType'
import { useTranslation } from 'react-i18next';
import { deleteComment } from '../api/comments';
import { Trash2 } from 'lucide-react';
import { useAuth } from '../auth/auth';

type CommentsProps = {
    comments: Comment[];
    loading: boolean;
    projectID: number;
    onDeleteComment: (id: number) => void;
};

export default function Comments({ comments, loading, projectID, onDeleteComment }: CommentsProps) {

    const { t } = useTranslation();
    const { user } = useAuth();

    const handleDeleteComment = async (id: number) => {
        try {
            await deleteComment(projectID, id);
            onDeleteComment(id);
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="mt-6">

            {loading ? (

                <p className="text-sm text-gray-500">
                    {t("card.loading_comments")}
                </p>

            ) : comments.length > 0 ? (

                <div className="space-y-5">

                    {comments.map((comment: any) => (

                        <div
                            key={comment.id}
                            className="flex gap-3"
                        >

                            <div className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-xs font-medium text-white ${comment.user?.image
                                ? ''
                                : 'bg-gradient-to-br from-blue-600/40 to-cyan-700/40'
                                }`}>
                                {comment.user?.image ? (
                                    <img
                                        src={comment.user.image}
                                        alt="avatar"
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                ) : (
                                    (comment.user?.email?.charAt(0).toUpperCase() || "U")
                                )}
                            </div>

                            <div className="flex-1 min-w-0">

                                <div className="flex flex-wrap items-center gap-2">

                                    <span className="text-sm font-medium text-gray-900 break-all">
                                        {comment.user?.fullName || comment.user?.name || comment.user?.email.split("@")[0]}
                                    </span>

                                    <small className="text-xs text-gray-400">
                                        {comment.created_ago}
                                    </small>

                                </div>

                                <div className="mt-1 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">

                                    <div className="flex items-start justify-between gap-3">

                                        <p className="text-sm text-gray-700 break-words flex-1">
                                            {comment.content}
                                        </p>

                                        {comment.user?.id === user.id && (
                                            <button
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="shrink-0 text-gray-400 hover:text-red-500 transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}

                                    </div>

                                </div>



                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center">
                    <p className="md:text-sm text-xs  text-gray-500">
                        {t("card.no_comments")}
                    </p>
                </div>

            )}

        </div>
    )
}
