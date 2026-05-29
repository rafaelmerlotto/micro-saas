import React from 'react'
import type { Comment } from '../types/commentType'
import { useTranslation } from 'react-i18next';

type CommentsProps = {
    comments: any[];
    loading: boolean;
};

export default function Comments({ comments, loading }: CommentsProps) {

    const { t } = useTranslation();

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

                            {/* Avatar */}
                            <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-blue-600/40 to-cyan-700/40 text-white flex items-center justify-center text-xs font-medium">
                                {comment.user?.email?.charAt(0).toUpperCase()}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">

                                {/* Header */}
                                <div className="flex flex-wrap items-center gap-2">

                                    <span className="text-sm font-medium text-gray-900 break-all">
                                        {comment.user?.email}
                                    </span>

                                    <small className="text-xs text-gray-400">
                                        3 days ago
                                    </small>

                                </div>

                                {/* Comment */}
                                <div className="mt-1 rounded-xl bg-gray-50 px-4 py-3 border border-gray-100">

                                    <p className="text-sm text-gray-700 break-words">
                                        {comment.content}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center">
                    <p className="text-sm text-gray-500">
                        {t("card.no_comments")}
                    </p>
                </div>

            )}

        </div>
    )
}
