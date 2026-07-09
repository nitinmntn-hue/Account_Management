"use client";

import {
    TrendingUp,
    TrendingDown,
    Wallet,
    Landmark,
    Users,
    Truck,
    BadgeIndianRupee,
    FolderTree,
    ArrowLeftRight,
    Building2,
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import BalanceCard from "@/components/dashboard/BalanceCard";
import TransactionTable from "@/components/dashboard/TransactionTable";

export default function DashboardPage() {
    return (
        <div className="space-y-8">

            {/* ========================================= */}
            {/* Welcome */}
            {/* ========================================= */}

            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome Back 👋
                </h1>

                <p className="mt-2 text-gray-500">
                    Here's an overview of your business today.
                </p>
            </div>

            {/* ========================================= */}
            {/* Statistics */}
            {/* ========================================= */}

            <section>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                    <StatCard
                        title="Today's Income"
                        value="₹18,500"
                        icon={TrendingUp}
                        color="green"
                        trend="up"
                        trendValue="+12%"
                        description="vs Yesterday"
                    />

                    <StatCard
                        title="Today's Expense"
                        value="₹8,300"
                        icon={TrendingDown}
                        color="red"
                        trend="down"
                        trendValue="-5%"
                        description="vs Yesterday"
                    />

                    <StatCard
                        title="Cash Balance"
                        value="₹75,200"
                        icon={Wallet}
                        color="blue"
                        trend="up"
                        trendValue="+₹5,500"
                        description="Available"
                    />

                    <StatCard
                        title="Bank Balance"
                        value="₹2,45,000"
                        icon={Landmark}
                        color="purple"
                        trend="up"
                        trendValue="+₹12,000"
                        description="All Accounts"
                    />

                </div>
            </section>

            {/* ========================================= */}
            {/* Quick Actions */}
            {/* ========================================= */}

            <section>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold">
                        Quick Actions
                    </h2>

                    <p className="text-gray-500 text-sm">
                        Frequently used shortcuts
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

                    <QuickActionCard
                        title="Add Payment"
                        description="Income / Expense"
                        href="/payments/add"
                        icon={BadgeIndianRupee}
                        color="green"
                    />

                    <QuickActionCard
                        title="Salary"
                        description="Pay Staff Salary"
                        href="/payments/salary"
                        icon={Users}
                        color="purple"
                    />

                    <QuickActionCard
                        title="Contra Entry"
                        description="Cash ↔ Bank"
                        href="/payments/contra"
                        icon={ArrowLeftRight}
                        color="blue"
                    />

                    <QuickActionCard
                        title="Vendor"
                        description="Create Vendor"
                        href="/parties/vendors"
                        icon={Truck}
                        color="orange"
                    />

                    <QuickActionCard
                        title="Income Head"
                        description="Create Head"
                        href="/heads/income"
                        icon={FolderTree}
                        color="yellow"
                    />

                </div>

            </section>

            {/* ========================================= */}
            {/* Account Summary */}
            {/* ========================================= */}

            <section>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold">
                        Cash & Bank Accounts
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <BalanceCard
                        title="Cash Counter"
                        accountNumber="Office Cash"
                        balance={85000}
                        todayChange={2500}
                        type="cash"
                    />

                    <BalanceCard
                        title="SBI Bank"
                        accountNumber="XXXX-4521"
                        balance={245000}
                        todayChange={18000}
                        type="bank"
                    />

                    <BalanceCard
                        title="HDFC Bank"
                        accountNumber="XXXX-7895"
                        balance={126000}
                        todayChange={-2500}
                        type="bank"
                    />

                    <BalanceCard
                        title="ICICI Bank"
                        accountNumber="XXXX-5612"
                        balance={82000}
                        todayChange={4200}
                        type="bank"
                    />

                </div>

            </section>

            {/* ========================================= */}
            {/* Overview */}
            {/* ========================================= */}

            <section>

                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Chart */}

                    {/* <div className="rounded-2xl border bg-white p-6 lg:col-span-2 shadow-sm">

                        <h2 className="text-xl font-semibold">
                            Income vs Expense
                        </h2>

                        <div className="mt-6 flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-gray-300">

                            <div className="text-center">

                                <TrendingUp
                                    size={60}
                                    className="mx-auto text-gray-300"
                                />

                                <p className="mt-4 text-gray-500">
                                    Recharts will be added here
                                </p>

                            </div>

                        </div>

                    </div> */}

                    {/* Summary */}

                    {/* <div className="rounded-2xl border bg-white p-6 shadow-sm">

                        <h2 className="text-xl font-semibold">
                            Business Summary
                        </h2>

                        <div className="mt-6 space-y-5">

                            <div className="flex justify-between">
                                <span>Total Customers</span>
                                <span className="font-bold">245</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Total Vendors</span>
                                <span className="font-bold">48</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Pending Payments</span>
                                <span className="font-bold text-red-600">
                                    ₹42,500
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Staff Salary</span>
                                <span className="font-bold">
                                    ₹1,25,000
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Bank Accounts</span>
                                <span className="font-bold">4</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Cash Accounts</span>
                                <span className="font-bold">2</span>
                            </div>

                        </div>

                    </div> */}

                </div>

            </section>

            {/* ========================================= */}
            {/* Recent Transactions */}
            {/* ========================================= */}

            {/* <TransactionTable /> */}

        </div>
    );
}