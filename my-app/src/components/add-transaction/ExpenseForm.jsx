"use client";

import { useState } from "react";
import {
    Save,
    RotateCcw,
    Calendar,
    IndianRupee,
} from "lucide-react";

export default function ExpenseForm() {
    const expenseHeads = [
        { id: 1, name: "Office Expense" },
        { id: 2, name: "Electricity Bill" },
        { id: 3, name: "Rent Expense" },
        { id: 4, name: "Staff Salary" },
    ];

    const accounts = [
        { id: 1, name: "Cash" },
        { id: 2, name: "HDFC Bank" },
        { id: 3, name: "SBI Bank" },
    ];

    const paymentModes = [
        "Cash",
        "Bank",
        "UPI",
        "Card",
        "Cheque",
    ];

    const [form, setForm] = useState({
        date: new Date().toISOString().split("T")[0],
        voucherNo: "EXP-0001",
        headId: "",
        paidTo: "",
        amount: "",
        paymentMode: "Cash",
        accountId: "",
        referenceNo: "",
        remarks: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(form);

        alert("Expense Saved Successfully");
    };

    const handleReset = () => {
        setForm({
            date: new Date().toISOString().split("T")[0],
            voucherNo: "EXP-0001",
            headId: "",
            paidTo: "",
            amount: "",
            paymentMode: "Cash",
            accountId: "",
            referenceNo: "",
            remarks: "",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl bg-white p-6 shadow"
        >
            <h2 className="text-2xl font-bold">
                Add Expense
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
                        value={form.voucherNo}
                        readOnly
                        className="w-full rounded-lg border bg-gray-100 px-3 py-2.5"
                    />
                </div>

                {/* Expense Head */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Expense Head
                    </label>

                    <select
                        name="headId"
                        value={form.headId}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    >
                        <option value="">Select Expense Head</option>

                        {expenseHeads.map((head) => (
                            <option key={head.id} value={head.id}>
                                {head.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Paid To */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Paid To
                    </label>

                    <input
                        type="text"
                        name="paidTo"
                        value={form.paidTo}
                        onChange={handleChange}
                        placeholder="Vendor / Person / Company"
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                {/* Amount */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Amount
                    </label>

                    <div className="relative">
                        <IndianRupee
                            size={18}
                            className="absolute left-3 top-3.5 text-gray-400"
                        />

                        <input
                            type="number"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            className="w-full rounded-lg border py-2.5 pl-10 pr-3"
                        />
                    </div>
                </div>

                {/* Payment Mode */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Payment Mode
                    </label>

                    <select
                        name="paymentMode"
                        value={form.paymentMode}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    >
                        {paymentModes.map((mode) => (
                            <option key={mode} value={mode}>
                                {mode}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Account */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Paid From Account
                    </label>

                    <select
                        name="accountId"
                        value={form.accountId}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    >
                        <option value="">Select Account</option>

                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.name}
                            </option>
                        ))}
                    </select>
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
                        placeholder="Cheque / UTR / Transaction ID"
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

            </div>

            {/* Remarks */}

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Remarks
                </label>

                <textarea
                    rows={4}
                    name="remarks"
                    value={form.remarks}
                    onChange={handleChange}
                    placeholder="Write remarks..."
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
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-white hover:bg-red-700"
                >
                    <Save size={18} />
                    Save Expense
                </button>

            </div>
        </form>
    );
}