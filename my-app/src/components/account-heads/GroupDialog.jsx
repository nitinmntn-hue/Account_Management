"use client";

import { useEffect, useState } from "react";
import { X, Save, RotateCcw } from "lucide-react";

const defaultForm = {
    name: "",
    type: "Income",
    status: true,
};

export default function GroupDialog({
    open,
    onClose,
    onSubmit,
    editingData = null,
}) {
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        if (editingData) {
            setForm({
                name: editingData.name || "",
                type: editingData.type || "Income",
                status:
                    editingData.status !== undefined
                        ? editingData.status
                        : true,
            });
        } else {
            setForm(defaultForm);
        }
    }, [editingData, open]);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            alert("Group name is required.");
            return;
        }

        onSubmit(form);
    };

    const handleReset = () => {
        if (editingData) {
            setForm({
                name: editingData.name,
                type: editingData.type,
                status: editingData.status,
            });
        } else {
            setForm(defaultForm);
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Dialog */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-5">

                        <div>
                            <h2 className="text-xl font-semibold">
                                {editingData
                                    ? "Edit Account Group"
                                    : "Create Account Group"}
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Create income and expense groups.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 hover:bg-gray-100"
                        >
                            <X size={20} />
                        </button>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 p-6"
                    >
                        {/* Group Name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Group Name
                                <span className="text-red-500"> *</span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter Group Name"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Type
                            </label>

                            <div className="grid grid-cols-2 gap-4">

                                <label className="flex cursor-pointer items-center gap-2 rounded-xl border p-4">

                                    <input
                                        type="radio"
                                        name="type"
                                        value="Income"
                                        checked={form.type === "Income"}
                                        onChange={handleChange}
                                    />

                                    Income

                                </label>

                                <label className="flex cursor-pointer items-center gap-2 rounded-xl border p-4">

                                    <input
                                        type="radio"
                                        name="type"
                                        value="Expense"
                                        checked={form.type === "Expense"}
                                        onChange={handleChange}
                                    />

                                    Expense

                                </label>

                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-between rounded-xl border p-4">

                            <div>

                                <h3 className="font-medium">
                                    Active
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Enable or disable this group.
                                </p>

                            </div>

                            <input
                                type="checkbox"
                                name="status"
                                checked={form.status}
                                onChange={handleChange}
                                className="h-5 w-5"
                            />

                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 border-t pt-5">

                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-gray-100"
                            >
                                <RotateCcw size={18} />

                                Reset
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl border border-red-300 px-5 py-3 text-red-600 hover:bg-red-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                            >
                                <Save size={18} />

                                {editingData ? "Update" : "Save"}
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </>
    );
}