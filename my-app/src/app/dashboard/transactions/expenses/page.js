"use client";

import { useState } from "react";

export default function AddExpensePage() {
    const [form, setForm] = useState({
        date: "",
        account: "",
        head: "",
        amount: "",
        vendor: "",
        paymentMode: "",
        remark: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">

            <h1 className="text-2xl font-bold mb-6">
                Add Expense
            </h1>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <select
                    name="head"
                    value={form.head}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                >
                    <option>Select Expense Head</option>
                    <option>Salary</option>
                    <option>Fuel</option>
                    <option>Rent</option>
                    <option>Office Expense</option>
                </select>

                <select
                    name="account"
                    value={form.account}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                >
                    <option>Cash</option>
                    <option>Bank</option>
                    <option>UPI</option>
                </select>

                <input
                    type="text"
                    name="vendor"
                    value={form.vendor}
                    onChange={handleChange}
                    placeholder="Vendor Name"
                    className="border rounded-lg p-3"
                />

                <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    className="border rounded-lg p-3"
                />

                <select
                    name="paymentMode"
                    value={form.paymentMode}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                >
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>UPI</option>
                    <option>NEFT</option>
                </select>

                <div className="md:col-span-2">
                    <textarea
                        rows={4}
                        name="remark"
                        value={form.remark}
                        onChange={handleChange}
                        placeholder="Remark"
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <button
                        className="bg-red-600 text-white px-6 py-3 rounded-lg"
                    >
                        Save Expense
                    </button>
                </div>
            </form>
        </div>
    );
}