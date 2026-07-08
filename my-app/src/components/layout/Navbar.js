"use client";

import { Menu, Bell, UserCircle } from "lucide-react";

export default function Navbar({ onMenuClick }) {
    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
            <button
                onClick={onMenuClick}
                className="md:hidden"
            >
                <Menu />
            </button>

            <h2 className="font-semibold text-lg">
                Account Management
            </h2>

            <div className="flex items-center gap-5">
                <Bell className="cursor-pointer" />
                <UserCircle className="cursor-pointer" size={30} />
            </div>
        </header>
    );
}