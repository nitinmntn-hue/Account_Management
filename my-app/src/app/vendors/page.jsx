"use client";

import { useState } from "react";
import { Save, RotateCcw, UserPlus } from "lucide-react";
import { buttonStyles } from "@/lib/buttonStyles";

export default function Vendor() {
    const [form, setForm] = useState({
        vendorCode: "VEN-0001",
        name: "",
        company: "",
        mobile: "",
        email: "",
        gstNo: "",
        panNo: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        openingBalance: "",
        balanceType: "Payable",
        remarks: "",
        status: "Active",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleReset = () => {
        setForm({
            vendorCode: "VEN-0001",
            name: "",
            company: "",
            mobile: "",
            email: "",
            gstNo: "",
            panNo: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            openingBalance: "",
            balanceType: "Payable",
            remarks: "",
            status: "Active",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        alert("Vendor Saved Successfully");
    };

    return (
        <div className="mx-auto max-w-6xl rounded-xl bg-white p-6 shadow">
            <div className="mb-6 flex items-center gap-3">
                <UserPlus className="h-7 w-7 text-teal-600" />
                <div>
                    <h1 className="text-2xl font-bold">Add Vendor</h1>
                    <p className="text-sm text-slate-500">
                        Create a new vendor using dummy data.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>
                    <label className="mb-2 block text-sm font-medium">Vendor Code</label>
                    <input
                        readOnly
                        value={form.vendorCode}
                        className="w-full rounded-lg border bg-slate-100 px-3 py-2.5"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Vendor Name *</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Company</label>
                    <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Mobile *</label>
                    <input
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">GST No.</label>
                    <input
                        name="gstNo"
                        value={form.gstNo}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">PAN No.</label>
                    <input
                        name="panNo"
                        value={form.panNo}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Opening Balance</label>
                    <input
                        type="number"
                        name="openingBalance"
                        value={form.openingBalance}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Balance Type</label>
                    <select
                        name="balanceType"
                        value={form.balanceType}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    >
                        <option>Payable</option>
                        <option>Receivable</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    >
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">Address</label>
                    <textarea
                        rows={3}
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">City</label>
                    <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">State</label>
                    <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Pincode</label>
                    <input
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">Remarks</label>
                    <textarea
                        rows={3}
                        name="remarks"
                        value={form.remarks}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-3 py-2.5"
                    />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 border-t pt-5">
                    <button
                        type="button"
                        onClick={handleReset}
                        className={buttonStyles.secondary}
                    >
                        <RotateCcw size={18} />
                        Reset
                    </button>

                    <button
                        type="submit"
                        className={buttonStyles.primary}
                    >
                        <Save size={18} />
                        Save Vendor
                    </button>
                </div>

            </form>
        </div>
    );
}