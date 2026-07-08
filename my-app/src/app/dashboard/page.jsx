"use client";
import {
    Wallet,
    Landmark,
    TrendingUp,
    TrendingDown,
    Users,
    Receipt,
    ArrowRightLeft,
    IndianRupee,
    BarChart,
    FileText,
    CreditCard,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const cards = [
    {
        title: "Today's Income",
        amount: "₹25,500",
        icon: TrendingUp,
        color: "bg-green-500",
    },
    {
        title: "Today's Expense",
        amount: "₹8,200",
        icon: TrendingDown,
        color: "bg-red-500",
    },
    {
        title: "Cash In Hand",
        amount: "₹1,20,000",
        icon: Wallet,
        color: "bg-yellow-500",
    },
    {
        title: "Bank Balance",
        amount: "₹3,42,500",
        icon: Landmark,
        color: "bg-blue-500",
    },
    {
        title: "Total Vendors",
        amount: "25",
        icon: Users,
        color: "bg-purple-500",
    },
    {
        title: "Transactions",
        amount: "256",
        icon: Receipt,
        color: "bg-indigo-500",
    },
    {
        title: "Profit",
        amount: "₹17,300",
        icon: IndianRupee,
        color: "bg-emerald-500",
    },
    {
        title: "Contra Voucher",
        amount: "12",
        icon: ArrowRightLeft,
        color: "bg-orange-500",
    },
];

export default function Dashboard() {
    const pathname = usePathname();



    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Dashboard
                    </h1>
                    <p className="text-gray-500">
                        Welcome to Account Management System
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow px-5 py-3">
                    Financial Year
                    <br />
                    <span className="font-bold">
                        2026 - 2027
                    </span>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
                    >
                        <div>
                            <p className="text-gray-500 text-sm">
                                {card.title}
                            </p>

                            <h2 className="text-2xl font-bold mt-2">
                                {card.amount}
                            </h2>
                        </div>

                        <div
                            className={`${card.color} p-3 rounded-lg text-white`}
                        >
                            <card.icon size={28} />
                        </div>
                    </div>
                ))}

            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">

                <div className="bg-white rounded-xl shadow p-5 h-80">
                    <h2 className="font-semibold text-lg mb-4">
                        Income vs Expense
                    </h2>

                    <div className="flex justify-center items-center h-full text-gray-400">
                        Chart Here
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 h-80">
                    <h2 className="font-semibold text-lg mb-4">
                        Cash Flow
                    </h2>

                    <div className="flex justify-center items-center h-full text-gray-400">
                        Chart Here
                    </div>
                </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-6 mt-8">

                <div className="lg:col-span-2 bg-white rounded-xl shadow p-5">

                    <h2 className="text-lg font-semibold mb-4">
                        Latest Transactions
                    </h2>

                    <table className="w-full">

                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3">Date</th>
                                <th className="text-left">Type</th>
                                <th className="text-left">Party</th>
                                <th className="text-right">Amount</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr className="border-b">
                                <td className="py-3">05 Jul</td>
                                <td>Income</td>
                                <td>ABC Traders</td>
                                <td className="text-right text-green-600">
                                    ₹5,000
                                </td>
                            </tr>

                            <tr className="border-b">
                                <td className="py-3">05 Jul</td>
                                <td>Expense</td>
                                <td>Fuel</td>
                                <td className="text-right text-red-600">
                                    ₹1,200
                                </td>
                            </tr>

                            <tr>
                                <td className="py-3">04 Jul</td>
                                <td>Deposit</td>
                                <td>SBI</td>
                                <td className="text-right">
                                    ₹20,000
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

                <div className="bg-white rounded-xl shadow p-5">

                    <h2 className="text-lg font-semibold mb-4">
                        Quick Actions
                    </h2>

                    <div className="grid gap-3">

                        <Link
                            href={"dashboard/transactions/income"}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg transition bg-slate-800 text-slate-300    "

                        >
                            <TrendingUp size={20} />
                            <span>Add Income</span>
                        </Link>


                        <Link
                            href={"dashboard/transactions/expenses"}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg transition bg-slate-800 text-slate-300"

                        >
                            <TrendingDown size={20} />
                            <span>Add Expense</span>
                        </Link>

                        <Link
                            href={"dashboard/transactions/cash-deposit"}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg transition bg-slate-800 text-slate-300"

                        >
                            <CreditCard size={20} />
                            <span>Cash Deposit</span>
                        </Link>


                        <Link
                            href={"dashboard/transactions/cash-withdraw"}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg transition bg-slate-800 text-slate-300"

                        >
                            <Wallet size={20} />
                            <span>Cash Withdraw</span>
                        </Link>

                        <Link
                            href={"dashboard/transactions/contra-voucher"}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg transition bg-slate-800 text-slate-300"

                        >
                            <FileText size={20} />
                            <span>Contra Voucher</span>
                        </Link>

                        <Link
                            href={"dashboard/reports"}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg transition bg-slate-800 text-slate-300"

                        >
                            <BarChart size={20} />
                            <span>View Reports</span>
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}