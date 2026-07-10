"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteDialog({
    open,
    title = "Delete Record",
    message = "Are you sure you want to delete this record?",
    item = null,
    loading = false,
    onClose,
    onConfirm,
}) {
    if (!open) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-6 py-5">

                        <div className="flex items-center gap-3">

                            <div className="rounded-full bg-red-100 p-3">
                                <AlertTriangle
                                    size={28}
                                    className="text-red-600"
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {title}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    This action cannot be undone.
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 hover:bg-gray-100"
                        >
                            <X size={20} />
                        </button>

                    </div>

                    {/* Body */}
                    <div className="space-y-5 px-6 py-6">

                        <p className="text-gray-700">
                            {message}
                        </p>

                        {item && (
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                                {item.name && (
                                    <div className="mb-3 flex justify-between">

                                        <span className="text-gray-500">
                                            Name
                                        </span>

                                        <span className="font-semibold text-gray-800">
                                            {item.name}
                                        </span>

                                    </div>
                                )}

                                {item.type && (
                                    <div className="mb-3 flex justify-between">

                                        <span className="text-gray-500">
                                            Type
                                        </span>

                                        <span className="font-medium">
                                            {item.type}
                                        </span>

                                    </div>
                                )}

                                {item.groupName && (
                                    <div className="mb-3 flex justify-between">

                                        <span className="text-gray-500">
                                            Group
                                        </span>

                                        <span>
                                            {item.groupName}
                                        </span>

                                    </div>
                                )}

                                {item.description && (
                                    <div className="flex flex-col">

                                        <span className="mb-1 text-gray-500">
                                            Description
                                        </span>

                                        <span className="text-gray-700">
                                            {item.description}
                                        </span>

                                    </div>
                                )}

                            </div>
                        )}

                        <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                            <p className="text-sm text-red-700">
                                Deleting this record may affect reports and existing
                                transactions.

                                <br />

                                If this record has already been used in any transaction,
                                it is recommended to mark it as{" "}
                                <strong>Inactive</strong> instead of deleting it.
                            </p>

                        </div>

                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t px-6 py-5">

                        <button
                            type="button"
                            disabled={loading}
                            onClick={onClose}
                            className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => onConfirm(item)}
                            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Trash2 size={18} />

                            {loading ? "Deleting..." : "Delete"}
                        </button>

                    </div>

                </div>
            </div>
        </>
    );
}