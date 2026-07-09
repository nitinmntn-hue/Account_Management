"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  Users,
  Truck,
  Landmark,
  FolderTree,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Receipt,
  CircleDollarSign,
} from "lucide-react";
import { useState } from "react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Payments",
    icon: Wallet,
    children: [
      {
        title: "Add Payment",
        href: "/payments/add",
      },
      {
        title: "Payment History",
        href: "/payments/history",
      },
      {
        title: "Salary",
        href: "/payments/salary",
      },
      {
        title: "Contra / Deposit",
        href: "/payments/contra",
      },
    ],
  },
  {
    title: "Parties",
    icon: Users,
    children: [
      {
        title: "Customers",
        href: "/parties/customers",
      },
      {
        title: "Vendors",
        href: "/parties/vendors",
      },
    ],
  },
  {
    title: "Account Heads",
    icon: FolderTree,
    children: [
      {
        title: "Income Heads",
        href: "/heads/income",
      },
      {
        title: "Expense Heads",
        href: "/heads/expense",
      },
    ],
  },
  {
    title: "Accounts",
    icon: Landmark,
    children: [
      {
        title: "Cash Accounts",
        href: "/accounts/cash",
      },
      {
        title: "Bank Accounts",
        href: "/accounts/bank",
      },
      {
        title: "Account Groups",
        href: "/accounts/groups",
      },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    children: [
      {
        title: "Head Wise",
        href: "/reports/headwise",
      },
      {
        title: "Date Wise",
        href: "/reports/datewise",
      },
      {
        title: "Income",
        href: "/reports/income",
      },
      {
        title: "Expense",
        href: "/reports/expense",
      },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState({
    Payments: true,
    Parties: false,
    Accounts: false,
    Reports: false,
    "Account Heads": false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 border-b flex items-center px-6">
        <CircleDollarSign className="text-blue-600 mr-2" size={30} />

        <div>
          <h1 className="font-bold text-lg text-gray-800">
            Account ERP
          </h1>

          <p className="text-xs text-gray-500">
            Finance Management
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          if (!menu.children) {
            return (
              <Link
                key={menu.title}
                href={menu.href}
                className={`mx-3 mb-1 flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${pathname === menu.href
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                <Icon size={20} />
                <span>{menu.title}</span>
              </Link>
            );
          }

          return (
            <div key={menu.title} className="mb-2">
              <button
                onClick={() => toggleMenu(menu.title)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-100 mx-3"
              >
                <div className="flex items-center gap-3 text-gray-700">
                  <Icon size={20} />
                  <span>{menu.title}</span>
                </div>

                {openMenus[menu.title] ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {openMenus[menu.title] && (
                <div className="ml-6 mt-1 space-y-1">
                  {menu.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition
                      ${pathname === child.href
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100 text-gray-600"
                        }`}
                    >
                      <Receipt size={16} />
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom User */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-xl bg-gray-100 p-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            A
          </div>

          <div>
            <h3 className="font-semibold text-sm">
              Admin
            </h3>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}