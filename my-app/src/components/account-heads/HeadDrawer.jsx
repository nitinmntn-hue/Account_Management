"use client";

import { X } from "lucide-react";
import HeadForm from "./HeadForm";

export default function HeadDrawer({
    open,
    onClose,
    onSubmit,
    editingData = null,
    groups = [],
}) {
    if (!open) return null;

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xl flex-col bg-white shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {editingData ? "Edit Account Head" : "Add Account Head"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {editingData
                                ? "Update account head details."
                                : "Create a new account head."}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 transition hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">

                    <HeadForm
                        initialData={editingData}
                        groups={groups}
                        onSubmit={onSubmit}
                        onCancel={onClose}
                    />

                </div>

            </div>
        </>
    );
}