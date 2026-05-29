import React from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal box */}
            <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">

                    {title && (
                        <h2 className="text-lg font-semibold text-gray-900">
                            {title}
                        </h2>
                    )}

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-black"
                    >
                        ✕
                    </button>

                </div>

                {/* Content */}
                <div>{children}</div>

            </div>
        </div>
    );
}