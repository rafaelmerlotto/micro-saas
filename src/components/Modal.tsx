import React from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center md:px-0 px-4">

            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

                <div>{children}</div>

            </div>
        </div>
    );
}