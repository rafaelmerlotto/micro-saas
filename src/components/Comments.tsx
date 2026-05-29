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
                <p className="text-gray-500">{t("card.loading_comments")}</p>
            ) : (
                comments.length > 0 ? (
                    comments.map((comment: any) => (
                        <div key={comment.id} className="mb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-600/40 to-cyan-700/40 text-white flex items-center justify-center text-xs font-medium">
                                    {comment.user?.email?.charAt(0).toUpperCase()}
                                </div>
                                {comment.user?.email}
                                <small >3 days ago</small>
                            </div>
                            <div className="flex items-center gap-3 mb-2 pl-8 pb-2">
                                <span className="text-sm font-medium text-neutral-500">{comment.content}</span>

                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">{t("card.no_comments")}</p>
                )
            )
            }
        </div >
    )
}
