"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ item }) {
    const pathname = usePathname();

    const active = pathname === item.path;

    return (
        <Link
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
      ${active
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800 text-slate-300"
                }`}
        >
            {item.icon && <item.icon size={20} />}
            <span>{item.title}</span>
        </Link>
    );
}