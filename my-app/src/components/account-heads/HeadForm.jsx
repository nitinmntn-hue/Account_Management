"use client";

import { useEffect, useState } from "react";
import { Save, RotateCcw } from "lucide-react";

export default function HeadForm({
    initialData = null,
    onSubmit,
    onCancel,
}) {
    const defaultForm = {
        name: "",
        type: "Income",
        group: "Direct Income",
        description: "",
        status: true,
    };

    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                type: initialData.type || "Income",
                group: initialData.group || "Direct Income",
                description: initialData.description || "",
                status:
                    initialData.status !== undefined
                        ? initialData.status
                        : true,
            });
        } else {
            setForm(defaultForm);
        }
    }, [initialData]);

    // Change Input
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Change Group Automatically
    useEffect(() => {
        if (form.type === "Income") {
            if (
                form.group === "Direct Expense" ||
                form.group === "Indirect Expense"
            ) {
                setForm((prev) => ({
                    ...prev,
                    group: "Direct Income",
                }));
            }
        } else {
            if (
                form.group === "Direct Income" ||
                form.group === "Indirect Income"
            ) {
                setForm((prev) => ({
                    ...prev,
                    group: "Direct Expense",
                }));
            }
        }
    }, [form.type]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            alert("Head Name is required.");
            return;
        }

        onSubmit(form);
    };

    const handleReset = () => {
        if (initialData) {
            setForm(initialData);
        } else {
            setForm(defaultForm);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* Head Name */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Head Name <span className="text-red-500">*</span>
                </label>

                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter Head Name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
            </div>

            {/* Type */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Type
                </label>

                <div className="grid grid-cols-2 gap-4">
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border p-3">
                        <input
                            type="radio"
                            name="type"
                            value="Income"
                            checked={form.type === "Income"}
                            onChange={handleChange}
                        />

                        Income
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border p-3">
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

            {/* Group */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Account Group
                </label>

                <select
                    name="group"
                    value={form.group}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                >
                    {form.type === "Income" ? (
                        <>
                            <option>Direct Income</option>
                            <option>Indirect Income</option>
                        </>
                    ) : (
                        <>
                            <option>Direct Expense</option>
                            <option>Indirect Expense</option>
                        </>
                    )}
                </select>
            </div>

            {/* Description */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                </label>

                <textarea
                    rows={4}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Optional description..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
            </div>

            {/* Status */}
            <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                <div>
                    <h3 className="font-medium text-gray-700">
                        Active Status
                    </h3>

                    <p className="text-sm text-gray-500">
                        Enable or disable this account head.
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
            <div className="flex justify-end gap-3 border-t pt-6">
                <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 hover:bg-gray-100"
                >
                    <RotateCcw size={18} />
                    Reset
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-red-300 px-5 py-3 text-red-600 hover:bg-red-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                    <Save size={18} />
                    {initialData ? "Update Head" : "Save Head"}
                </button>
            </div>
        </form>
    );
}