"use client";

import {
    Bell,
    Search,
    Menu,
    Settings,
    CalendarDays,
    CircleUserRound,
} from "lucide-react";

export default function Navbar({ onMenuClick }) {
    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200">
            <div className="flex h-full items-center justify-between px-6">
                {/* Left */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden rounded-lg p-2 hover:bg-gray-100"
                    >
                        <Menu size={22} />
                    </button>

                    {/* Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Dashboard
                        </h1>

                        <p className="text-xs text-gray-500">
                            Welcome back 👋
                        </p>
                    </div>
                </div>

                {/* Center Search */}
                <div className="hidden md:flex flex-1 justify-center px-10">
                    <div className="relative w-full max-w-xl">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search transactions, vendors, customers..."
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    {/* Date */}
                    <div className="hidden xl:flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-600">
                        <CalendarDays size={18} />
                        {today}
                    </div>

                    {/* Notification */}
                    <button className="relative rounded-xl border border-gray-200 p-2 hover:bg-gray-100 transition">
                        <Bell size={20} />

                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>

                    {/* Settings */}
                    <button className="rounded-xl border border-gray-200 p-2 hover:bg-gray-100 transition">
                        <Settings size={20} />
                    </button>

                    {/* Profile */}
                    <button className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2 hover:bg-gray-100 transition">
                        <CircleUserRound
                            size={34}
                            className="text-blue-600"
                        />

                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold text-gray-800">
                                Admin
                            </p>

                            <p className="text-xs text-gray-500">
                                Administrator
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
}