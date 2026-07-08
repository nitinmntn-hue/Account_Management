"use client";

import { useState } from "react";

export default function ContraVoucherPage() {
    const [form, setForm] = useState({
        date: "",
        fromAccount: "",
        toAccount: "",
        amount: "",
        remark: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

            <h1 className="text-2xl font-bold mb-6">
                Contra Voucher
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
                    name="fromAccount"
                    value={form.fromAccount}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                >
                    <option>Transfer From</option>
                    <option>Cash</option>
                    <option>SBI Bank</option>
                    <option>HDFC Bank</option>
                </select>

                <select
                    name="toAccount"
                    value={form.toAccount}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                >
                    <option>Transfer To</option>
                    <option>Cash</option>
                    <option>SBI Bank</option>
                    <option>HDFC Bank</option>
                </select>

                <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Transfer Amount"
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

                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                    Save Voucher
                </button>

            </form>

        </div>
    );
}