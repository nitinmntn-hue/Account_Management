"use client";

import {
    Pencil,
    Trash2,
    Eye,
    ArrowUpCircle,
    ArrowDownCircle,
    Wallet,
    Landmark,
} from "lucide-react";

const transactions = [
    {
        id: 1,
        date: "09 Jul 2026",
        voucher: "INC-1001",
        type: "Income",
        head: "Sales Income",
        account: "Cash Counter",
        amount: 12500,
        payment: "Cash",
        status: "Completed",
    },
    {
        id: 2,
        date: "09 Jul 2026",
        voucher: "EXP-2001",
        type: "Expense",
        head: "Office Rent",
        account: "SBI Bank",
        amount: 18000,
        payment: "Bank",
        status: "Completed",
    },
    {
        id: 3,
        date: "08 Jul 2026",
        voucher: "SAL-3001",
        type: "Salary",
        head: "Staff Salary",
        account: "ICICI Bank",
        amount: 22000,
        payment: "Bank",
        status: "Pending",
    },
    {
        id: 4,
        date: "08 Jul 2026",
        voucher: "CON-4001",
        type: "Contra",
        head: "Cash Deposit",
        account: "SBI Bank",
        amount: 10000,
        payment: "Transfer",
        status: "Completed",
    },
];

export default function TransactionTable() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Recent Transactions
                    </h2>

                    <p className="text-sm text-gray-500">
                        Latest income, expense & salary entries
                    </p>
                </div>

                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50 text-sm text-gray-600">
                        <tr>
                            <th className="px-6 py-4 text-left">Voucher</th>
                            <th className="px-6 py-4 text-left">Date</th>
                            <th className="px-6 py-4 text-left">Type</th>
                            <th className="px-6 py-4 text-left">Head</th>
                            <th className="px-6 py-4 text-left">Account</th>
                            <th className="px-6 py-4 text-right">Amount</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((item) => (
                            <tr
                                key={item.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                {/* Voucher */}
                                <td className="px-6 py-4 font-medium">
                                    {item.voucher}
                                </td>

                                {/* Date */}
                                <td className="px-6 py-4 text-gray-600">
                                    {item.date}
                                </td>

                                {/* Type */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {item.type === "Income" && (
                                            <ArrowUpCircle
                                                size={18}
                                                className="text-green-600"
                                            />
                                        )}

                                        {item.type === "Expense" && (
                                            <ArrowDownCircle
                                                size={18}
                                                className="text-red-600"
                                            />
                                        )}

                                        {item.type === "Salary" && (
                                            <Wallet
                                                size={18}
                                                className="text-orange-500"
                                            />
                                        )}

                                        {item.type === "Contra" && (
                                            <Landmark
                                                size={18}
                                                className="text-blue-600"
                                            />
                                        )}

                                        <span>{item.type}</span>
                                    </div>
                                </td>

                                {/* Head */}
                                <td className="px-6 py-4">
                                    {item.head}
                                </td>

                                {/* Account */}
                                <td className="px-6 py-4">
                                    {item.account}
                                </td>

                                {/* Amount */}
                                <td
                                    className={`px-6 py-4 text-right font-semibold ${item.type === "Expense" ||
                                            item.type === "Salary"
                                            ? "text-red-600"
                                            : "text-green-600"
                                        }`}
                                >
                                    ₹ {item.amount.toLocaleString("en-IN")}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100">
                                            <Eye size={18} />
                                        </button>

                                        <button className="rounded-lg bg-yellow-50 p-2 text-yellow-600 hover:bg-yellow-100">
                                            <Pencil size={18} />
                                        </button>

                                        <button className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}