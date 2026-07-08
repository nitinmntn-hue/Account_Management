"use client";

import { useState } from "react";

export default function CashDepositPage() {
    const [form, setForm] = useState({
        date: "",
        bank: "",
        amount: "",
        remark: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

            <h1 className="text-2xl font-bold mb-6">
                Cash Deposit
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">

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
                    <option>ICICI</option>
                </select>

                <input
                    type="number"
                    name="amount"
                    placeholder="Deposit Amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <textarea
                    rows="3"
                    name="remark"
                    placeholder="Remark"
                    value={form.remark}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <button className="bg-green-600 text-white px-6 py-3 rounded-lg">
                    Deposit Cash
                </button>

            </form>

        </div>
    );
}