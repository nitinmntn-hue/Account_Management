"use client";

import {
    Wallet,
    Landmark,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

export default function BalanceCard({
    title,
    accountNumber,
    balance,
    type = "bank",
    todayChange = 0,
}) {
    const isPositive = todayChange >= 0;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${type === "cash"
                            ? "bg-green-100"
                            : "bg-blue-100"
                        }`}
                >
                    {type === "cash" ? (
                        <Wallet
                            className="text-green-600"
                            size={28}
                        />
                    ) : (
                        <Landmark
                            className="text-blue-600"
                            size={28}
                        />
                    )}
                </div>

                {isPositive ? (
                    <TrendingUp className="text-green-500" size={20} />
                ) : (
                    <TrendingDown className="text-red-500" size={20} />
                )}
            </div>

            {/* Account Info */}
            <div className="mt-5">
                <h3 className="text-lg font-semibold text-gray-800">
                    {title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    {accountNumber}
                </p>
            </div>

            {/* Balance */}
            <div className="mt-6">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                    Available Balance
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    ₹ {Number(balance).toLocaleString("en-IN")}
                </h2>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between border-t pt-4">
                <span className="text-sm text-gray-500">
                    Today's Change
                </span>

                <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${isPositive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {isPositive ? "+" : "-"}₹
                    {Math.abs(todayChange).toLocaleString("en-IN")}
                </span>
            </div>
        </div>
    );
}