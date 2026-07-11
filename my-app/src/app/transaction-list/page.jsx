"use client"
import { buttonStyles } from '@/lib/buttonStyles';
import React, { useState } from 'react'

const transactions = [
    {
        id: 1,
        date: "2026-07-11",
        voucherNo: "INC-0001",
        type: "Income",
        head: "Sales Income",
        party: "Rahul Sharma",
        account: "Cash",
        debit: 0,
        credit: 25000,
        paymentMode: "Cash",
        remarks: "Retail sale",
    },
    {
        id: 2,
        date: "2026-07-11",
        voucherNo: "EXP-0001",
        type: "Expense",
        head: "Electricity Bill",
        party: "Jaipur Electricity Board",
        account: "HDFC Bank",
        debit: 3500,
        credit: 0,
        paymentMode: "Bank",
        remarks: "July electricity bill",
    },
    {
        id: 3,
        date: "2026-07-11",
        voucherNo: "INC-0002",
        type: "Income",
        head: "Service Income",
        party: "ABC Traders",
        account: "SBI Bank",
        debit: 0,
        credit: 15000,
        paymentMode: "UPI",
        remarks: "Repair service",
    },
    {
        id: 4,
        date: "2026-07-10",
        voucherNo: "EXP-0002",
        type: "Expense",
        head: "Office Rent",
        party: "Mahesh Properties",
        account: "HDFC Bank",
        debit: 18000,
        credit: 0,
        paymentMode: "Bank",
        remarks: "Office rent",
    },
    {
        id: 5,
        date: "2026-07-10",
        voucherNo: "CON-0001",
        type: "Contra",
        head: "Cash Deposit",
        party: "-",
        account: "Cash → HDFC Bank",
        debit: 0,
        credit: 0,
        paymentMode: "Contra",
        remarks: "Cash deposited to bank",
    },
    {
        id: 6,
        date: "2026-07-10",
        voucherNo: "CB-0001",
        type: "Cash Deposit",
        head: "Cash Deposit",
        party: "-",
        account: "HDFC Bank",
        debit: 0,
        credit: 10000,
        paymentMode: "Cash",
        remarks: "Deposit to HDFC",
    },
    {
        id: 7,
        date: "2026-07-09",
        voucherNo: "CB-0002",
        type: "Cash Withdrawal",
        head: "Cash Withdrawal",
        party: "-",
        account: "SBI Bank",
        debit: 5000,
        credit: 0,
        paymentMode: "Bank",
        remarks: "Cash withdrawn",
    },
    {
        id: 8,
        date: "2026-07-09",
        voucherNo: "JV-0001",
        type: "Journal",
        head: "Depreciation",
        party: "-",
        account: "Furniture",
        debit: 3000,
        credit: 3000,
        paymentMode: "-",
        remarks: "Monthly depreciation",
    },
    {
        id: 9,
        date: "2026-07-08",
        voucherNo: "EXP-0003",
        type: "Expense",
        head: "Internet Bill",
        party: "Jio Fiber",
        account: "Cash",
        debit: 1200,
        credit: 0,
        paymentMode: "Cash",
        remarks: "Broadband payment",
    },
    {
        id: 10,
        date: "2026-07-08",
        voucherNo: "INC-0003",
        type: "Income",
        head: "Interest Income",
        party: "HDFC Bank",
        account: "HDFC Bank",
        debit: 0,
        credit: 850,
        paymentMode: "Bank",
        remarks: "Savings interest",
    },
    {
        id: 11,
        date: "2026-07-07",
        voucherNo: "EXP-0004",
        type: "Expense",
        head: "Staff Salary",
        party: "Amit Kumar",
        account: "HDFC Bank",
        debit: 25000,
        credit: 0,
        paymentMode: "Bank",
        remarks: "Salary for July",
    },
    {
        id: 12,
        date: "2026-07-07",
        voucherNo: "JV-0002",
        type: "Journal",
        head: "Opening Balance",
        party: "-",
        account: "Capital Account",
        debit: 500000,
        credit: 500000,
        paymentMode: "-",
        remarks: "Opening balance entry",
    },
];

const TransactionList = () => {
    const [transactionType, setTransactionType] = useState("all");

    const transactionTypes = [
        { value: "all", label: "All" },
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" },
        { value: "contra", label: "Contra" },
        { value: "cash_deposit", label: "Cash Deposit" },
        { value: "cash_withdrawal", label: "Cash Withdrawal" },
        { value: "journal", label: "Journal Voucher" },
    ];
    const filteredTransactions =
        transactionType === "all"
            ? transactions
            : transactions.filter(
                (item) =>
                    item.type.toLowerCase().replace(/\s+/g, "_") === transactionType
            );
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">Account heads</h1>
                        <p className="mt-0.5 text-sm text-slate-500">
                            {/* {heads.length} heads across {groups.length} groups &middot; running on sample data */}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button

                            className={buttonStyles.secondary}
                        >
                            Dashboard
                        </button>
                        <button
                            className={buttonStyles.primary}
                        >
                            Add New Transaction
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">

                    <h3 className="mb-4 text-lg font-semibold">
                        Transaction Type
                    </h3>

                    <div className="flex flex-wrap gap-3">

                        {transactionTypes.map((item) => (

                            <label
                                key={item.value}
                                className={`cursor-pointer rounded-lg border px-4 py-2 transition

                ${transactionType === item.value
                                        ? "border-teal-600 bg-teal-50 text-teal-700"
                                        : "border-gray-300 bg-white hover:border-teal-400"
                                    }`}
                            >

                                <input
                                    type="radio"
                                    name="transactionType"
                                    value={item.value}
                                    checked={transactionType === item.value}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                    className="mr-2 accent-teal-600"
                                />

                                {item.label}

                            </label>

                        ))}

                    </div>



                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                    <th className="px-4 py-3 font-medium">S.No.</th>

                                    <th className="px-4 py-3 font-medium">Date</th>

                                    <th className="px-4 py-3 font-medium">Voucher No.</th>

                                    <th className="px-4 py-3 font-medium">Type</th>

                                    <th className="px-4 py-3 font-medium">Head</th>

                                    <th className="px-4 py-3 font-medium">Party</th>

                                    <th className="px-4 py-3 font-medium">Account</th>

                                    <th className="px-4 py-3 text-right font-medium">Debit (₹)</th>

                                    <th className="px-4 py-3 text-right font-medium">Credit (₹)</th>

                                    <th className="px-4 py-3 font-medium">Payment Mode</th>

                                    <th className="px-4 py-3 font-medium">Remarks</th>

                                    <th className="px-4 py-3 text-center font-medium">Actions</th>
                                </tr>
                            </thead>


                            <tbody>
                                {filteredTransactions.map((item, index) => (
                                    <tr key={item.id} className="border-b hover:bg-slate-50">

                                        <td className="px-4 py-3">{index + 1}</td>

                                        <td className="px-4 py-3">{item.date}</td>

                                        <td className="px-4 py-3">{item.voucherNo}</td>

                                        <td className="px-4 py-3">{item.type}</td>

                                        <td className="px-4 py-3">{item.head}</td>

                                        <td className="px-4 py-3">{item.party}</td>

                                        <td className="px-4 py-3">{item.account}</td>

                                        <td className="px-4 py-3 text-right">
                                            {item.debit ? `₹${item.debit}` : "-"}
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            {item.credit ? `₹${item.credit}` : "-"}
                                        </td>

                                        <td className="px-4 py-3">{item.paymentMode}</td>

                                        <td className="px-4 py-3">{item.remarks}</td>

                                        <td className="px-4 py-3 text-center">
                                            <button className={buttonStyles.secondary}>
                                                Edit
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionList