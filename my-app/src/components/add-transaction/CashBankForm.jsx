"use client";

import { useState } from "react";
import {
    Calendar,
    IndianRupee,
    Save,
    RotateCcw,
    Landmark,
} from "lucide-react";

export default function CashBankForm() {
    const accounts = [
        { id: 1, name: "Cash", type: "Cash" },
        { id: 2, name: "HDFC Bank", type: "Bank" },
        { id: 3, name: "SBI Bank", type: "Bank" },
        { id: 4, name: "ICICI Bank", type: "Bank" },
    ];

    const [form, setForm] = useState({
        type: "deposit",
        date: new Date().toISOString().split("T")[0],
        voucherNo: "CB-0001",
        cashAccount: 1,
        bankAccount: "",
        amount: "",
        referenceNo: "",
        remarks: "",
    });

    const bankAccounts = accounts.filter(
        (acc) => acc.type === "Bank"
    );

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleReset = () => {
        setForm({
            type: "deposit",
            date: new Date().toISOString().split("T")[0],
            voucherNo: "CB-0001",
            cashAccount: 1,
            bankAccount: "",
            amount: "",
            referenceNo: "",
            remarks: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(form);

        alert("Cash/Bank Entry Saved");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl bg-white p-6 shadow"
        >
            <h2 className="text-2xl font-bold">
                Cash / Bank Entry
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

                {/* Entry Type */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Entry Type
                    </label>

                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    >
                        <option value="deposit">
                            Cash Deposit
                        </option>

                        <option value="withdrawal">
                            Cash Withdrawal
                        </option>

                    </select>
                </div>

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
                        readOnly
                        value={form.voucherNo}
                        className="w-full rounded-lg border bg-gray-100 px-3 py-2.5"
                    />
                </div>

                {/* Bank */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Bank Account
                    </label>

                    <select
                        name="bankAccount"
                        value={form.bankAccount}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    >
                        <option value="">
                            Select Bank
                        </option>

                        {bankAccounts.map((acc) => (
                            <option
                                key={acc.id}
                                value={acc.id}
                            >
                                {acc.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Cash */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Cash Account
                    </label>

                    <input
                        readOnly
                        value="Cash"
                        className="w-full rounded-lg border bg-gray-100 px-3 py-2.5"
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

            {/* Preview */}

            <div className="rounded-xl border bg-slate-50 p-5">

                <div className="flex items-center justify-center gap-4">

                    <Landmark
                        size={24}
                        className="text-teal-600"
                    />

                    {form.type === "deposit" ? (
                        <h3 className="font-semibold text-teal-700">
                            Cash ➜ Bank
                        </h3>
                    ) : (
                        <h3 className="font-semibold text-blue-700">
                            Bank ➜ Cash
                        </h3>
                    )}

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
                    placeholder="Enter remarks..."
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
                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-2.5 text-white hover:bg-teal-700"
                >
                    <Save size={18} />
                    Save Entry
                </button>

            </div>

        </form>
    );
}