"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function SidebarDropdown({ item }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-4 py-3 rounded-lg hover:bg-slate-800"
            >
                <div className="flex items-center gap-3">
                    <item.icon size={20} />
                    <span>{item.title}</span>
                </div>

                <ChevronDown
                    size={18}
                    className={`transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                        <SidebarItem key={child.title} item={child} />
                    ))}
                </div>
            )}
        </div>
    );
}