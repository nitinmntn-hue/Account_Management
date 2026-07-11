"use client";

import { useState } from "react";
import {
    Calendar,
    ArrowRightLeft,
    Save,
    RotateCcw,
} from "lucide-react";

export default function JournalForm() {
    const accounts = [
        { id: 1, name: "Cash" },
        { id: 2, name: "HDFC Bank" },
        { id: 3, name: "Sales Account" },
        { id: 4, name: "Purchase Account" },
        { id: 5, name: "Salary Expense" },
        { id: 6, name: "Furniture" },
        { id: 7, name: "Capital Account" },
        { id: 8, name: "Loan Account" },
    ];

    const [form, setForm] = useState({
        date: new Date().toISOString().split("T")[0],
        voucherNo: "JRN-0001",
        debitAccount: "",
        creditAccount: "",
        amount: "",
        narration: "",
        referenceNo: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleReset = () => {
        setForm({
            date: new Date().toISOString().split("T")[0],
            voucherNo: "JRN-0001",
            debitAccount: "",
            creditAccount: "",
            amount: "",
            narration: "",
            referenceNo: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.debitAccount === form.creditAccount) {
            alert("Debit and Credit accounts cannot be the same.");
            return;
        }

        console.log(form);

        alert("Journal Entry Saved Successfully");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl bg-white p-6 shadow"
        >
            <h2 className="text-2xl font-bold">
                Add Journal Entry
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

                {/* Date */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Date
                    </label>

                    <div className="relative">

                        <Calendar
                            size={18}
                            className="absolute left-3 top-3.5 text-gray-400"
                        />

                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className="w-full rounded-lg border py-2.5 pl-10 pr-3"
                        />

                    </div>
                </div>

                {/* Voucher */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Voucher No
                    </label>

                    <input
                        type="text"
                        readOnly
                        value={form.voucherNo}
                        className="w-full rounded-lg border bg-gray-100 px-3 py-2.5"
                    />
                </div>

                {/* Debit */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Debit Account
                    </label>

                    <select
                        name="debitAccount"
                        value={form.debitAccount}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    >
                        <option value="">Select Debit Account</option>

                        {accounts.map((acc) => (
                            <option key={acc.id} value={acc.id}>
                                {acc.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Credit */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Credit Account
                    </label>

                    <select
                        name="creditAccount"
                        value={form.creditAccount}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    >
                        <option value="">Select Credit Account</option>

                        {accounts.map((acc) => (
                            <option key={acc.id} value={acc.id}>
                                {acc.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Amount */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Amount
                    </label>

                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                {/* Reference */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Reference No
                    </label>

                    <input
                        type="text"
                        name="referenceNo"
                        value={form.referenceNo}
                        onChange={handleChange}
                        placeholder="Invoice / Voucher / Ref No"
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

            </div>

            {/* Preview */}

            {form.debitAccount && form.creditAccount && (
                <div className="flex items-center justify-center gap-3 rounded-xl border bg-slate-50 p-4">

                    <ArrowRightLeft
                        className="text-blue-600"
                        size={22}
                    />

                    <span className="font-medium text-slate-700">
                        Debit Account → Credit Account
                    </span>

                </div>
            )}

            {/* Narration */}

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Narration
                </label>

                <textarea
                    rows={4}
                    name="narration"
                    value={form.narration}
                    onChange={handleChange}
                    placeholder="Enter narration..."
                    className="w-full rounded-lg border px-3 py-2.5"
                />
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3 border-t pt-5">

                <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100"
                >
                    <RotateCcw size={18} />
                    Reset
                </button>

                <button
                    type="submit"
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-white hover:bg-indigo-700"
                >
                    <Save size={18} />
                    Save Journal
                </button>

            </div>

        </form>
    );
}