import {
    LayoutDashboard,
    Wallet,
    Users,
    Landmark,
    BarChart3,
    Send,
    Settings,
} from "lucide-react";

const sidebarData = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },

    {
        title: "Transactions",
        icon: Wallet,
        children: [
            { title: "Add Income", path: "/dashboard/transactions/income" },
            { title: "Add Expense", path: "/dashboard/transactions/expenses" },
            { title: "Cash Deposit", path: "/dashboard/transactions/cash-deposit" },
            { title: "Cash Withdraw", path: "/dashboard/transactions/cash-withdraw" },
            { title: "Contra Voucher", path: "/dashboard/transactions/contra-voucher" },
        ],
    },

    {
        title: "Parties",
        icon: Users,
        children: [
            { title: "Vendors", path: "/dashboard/parties/vendors" },
            { title: "Customers", path: "/dashboard/parties/customers" },
        ],
    },

    {
        title: "Accounts",
        icon: Landmark,
        children: [
            { title: "Bank Accounts", path: "/dashboard/accounts/banks" },
            { title: "Cash Accounts", path: "/dashboard/accounts/cash" },
        ],
    },

    {
        title: "Reports",
        icon: BarChart3,
        children: [
            { title: "Daily", path: "/reports/daily" },
            { title: "Monthly", path: "/reports/monthly" },
            { title: "Cash Flow", path: "/reports/cash-flow" },
        ],
    },

    {
        title: "Export & Share",
        icon: Send,
        children: [
            { title: "PDF", path: "/export/pdf" },
            { title: "Excel", path: "/export/excel" },
            { title: "WhatsApp", path: "/export/whatsapp" },
        ],
    },

    {
        title: "Settings",
        path: "/settings",
        icon: Settings,
    },
];

export default sidebarData;