"use client";

import { X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileSidebar({ open, onClose }) {
    if (!open) return null;

    return (
        <>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            <div className="fixed left-0 top-0 w-72 h-screen bg-slate-900 z-50 md:hidden">
                <div className="flex justify-end p-4">
                    <button onClick={onClose}>
                        <X className="text-white" />
                    </button>
                </div>

                <Sidebar />
            </div>
        </>
    );
}