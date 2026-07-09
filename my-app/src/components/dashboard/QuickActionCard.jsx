"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function QuickActionCard({
    title,
    description,
    href = "#",
    icon: Icon,
    color = "blue",
}) {
    const colors = {
        blue: {
            bg: "bg-blue-50",
            iconBg: "bg-blue-100",
            icon: "text-blue-600",
            hover: "hover:border-blue-500",
        },
        green: {
            bg: "bg-green-50",
            iconBg: "bg-green-100",
            icon: "text-green-600",
            hover: "hover:border-green-500",
        },
        red: {
            bg: "bg-red-50",
            iconBg: "bg-red-100",
            icon: "text-red-600",
            hover: "hover:border-red-500",
        },
        purple: {
            bg: "bg-purple-50",
            iconBg: "bg-purple-100",
            icon: "text-purple-600",
            hover: "hover:border-purple-500",
        },
        yellow: {
            bg: "bg-yellow-50",
            iconBg: "bg-yellow-100",
            icon: "text-yellow-600",
            hover: "hover:border-yellow-500",
        },
        orange: {
            bg: "bg-orange-50",
            iconBg: "bg-orange-100",
            icon: "text-orange-600",
            hover: "hover:border-orange-500",
        },
    };

    const theme = colors[color] || colors.blue;

    return (
        <Link
            href={href}
            className={`group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${theme.hover}`}
        >
            <div className="flex items-start justify-between">
                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${theme.iconBg}`}
                >
                    <Icon className={theme.icon} size={28} />
                </div>

                <ArrowRight
                    size={18}
                    className="text-gray-400 transition group-hover:translate-x-1"
                />
            </div>

            <div className="mt-5">
                <h3 className="text-lg font-semibold text-gray-800">
                    {title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    {description}
                </p>
            </div>
        </Link>
    );
}