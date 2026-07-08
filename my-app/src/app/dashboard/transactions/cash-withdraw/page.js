"use client";

import { useState } from "react";

export default function CashWithdrawPage() {
    const [form, setForm] = useState({
        date: "",
        bank: "",
        amount: "",
        remark: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

            <h1 className="text-2xl font-bold mb-6">
                Cash Withdraw
            </h1>

            <form className="space-y-5">

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <select
                    name="bank"
                    value={form.bank}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                >
                    <option>Select Bank</option>
                    <option>SBI</option>
                    <option>HDFC</option>
                </select>

                <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Withdraw Amount"
                    className="w-full border rounded-lg p-3"
                />

                <textarea
                    rows="3"
                    name="remark"
                    value={form.remark}
                    onChange={handleChange}
                    placeholder="Remark"
                    className="w-full border rounded-lg p-3"
                />

                <button className="bg-red-600 text-white px-6 py-3 rounded-lg">
                    Withdraw Cash
                </button>

            </form>

        </div>
    );
}