"use client";

import { useState } from "react";

export default function AddIncomePage() {
    const [form, setForm] = useState({
        date: "",
        account: "",
        head: "",
        amount: "",
        party: "",
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
        console.log("Income:", form);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">

            <h1 className="text-2xl font-bold mb-6">
                Add Income
            </h1>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
                <div>
                    <label className="block mb-2 font-medium">
                        Date
                    </label>

                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Income Head
                    </label>

                    <select
                        name="head"
                        value={form.head}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >
                        <option>Select Head</option>
                        <option>Sales</option>
                        <option>Commission</option>
                        <option>Interest</option>
                        <option>Other Income</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Receive In
                    </label>

                    <select
                        name="account"
                        value={form.account}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >
                        <option>Cash</option>
                        <option>Bank</option>
                        <option>UPI</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Party
                    </label>

                    <input
                        type="text"
                        name="party"
                        value={form.party}
                        onChange={handleChange}
                        placeholder="Customer Name"
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Amount
                    </label>

                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Payment Mode
                    </label>

                    <select
                        name="paymentMode"
                        value={form.paymentMode}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >
                        <option>Cash</option>
                        <option>Cheque</option>
                        <option>UPI</option>
                        <option>NEFT</option>
                        <option>RTGS</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-2 font-medium">
                        Remark
                    </label>

                    <textarea
                        rows={4}
                        name="remark"
                        value={form.remark}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3">
                    <button
                        type="reset"
                        className="px-6 py-3 border rounded-lg"
                    >
                        Reset
                    </button>

                    <button
                        type="submit"
                        className="px-6 py-3 bg-green-600 text-white rounded-lg"
                    >
                        Save Income
                    </button>
                </div>

            </form>
        </div>
    );
}