"use client";

import sidebarData from "@/config/sidebar";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-72 h-screen bg-slate-900 text-white flex-col border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold">Account ERP</h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sidebarData.map((item) =>
          item.children ? (
            <SidebarDropdown key={item.title} item={item} />
          ) : (
            <SidebarItem key={item.title} item={item} />
          )
        )}
      </nav>
    </aside>
  );
}