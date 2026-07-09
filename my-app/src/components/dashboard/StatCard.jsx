"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function StatCard({
    title,
    value,
    icon: Icon,
    color = "blue",
    trend = "up",
    trendValue = "0%",
    description = "",
}) {
    const colors = {
        blue: {
            bg: "bg-blue-100",
            text: "text-blue-600",
            badge: "bg-blue-50 text-blue-600",
        },
        green: {
            bg: "bg-green-100",
            text: "text-green-600",
            badge: "bg-green-50 text-green-600",
        },
        red: {
            bg: "bg-red-100",
            text: "text-red-600",
            badge: "bg-red-50 text-red-600",
        },
        yellow: {
            bg: "bg-yellow-100",
            text: "text-yellow-600",
            badge: "bg-yellow-50 text-yellow-600",
        },
        purple: {
            bg: "bg-purple-100",
            text: "text-purple-600",
            badge: "bg-purple-50 text-purple-600",
        },
        emerald: {
            bg: "bg-emerald-100",
            text: "text-emerald-600",
            badge: "bg-emerald-50 text-emerald-600",
        },
        orange: {
            bg: "bg-orange-100",
            text: "text-orange-600",
            badge: "bg-orange-50 text-orange-600",
        },
        indigo: {
            bg: "bg-indigo-100",
            text: "text-indigo-600",
            badge: "bg-indigo-50 text-indigo-600",
        },
    };

    const theme = colors[color] || colors.blue;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-800">
                        {value}
                    </h2>
                </div>

                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${theme.bg}`}
                >
                    <Icon className={theme.text} size={28} />
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between">
                <div
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${theme.badge}`}
                >
                    {trend === "up" ? (
                        <ArrowUpRight size={15} />
                    ) : (
                        <ArrowDownRight size={15} />
                    )}

                    {trendValue}
                </div>

                <span className="text-xs text-gray-500">
                    {description}
                </span>
            </div>
        </div>
    );
}