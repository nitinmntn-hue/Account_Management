"use client"
import React, { useState } from 'react';
import { buttonStyles } from '@/lib/buttonStyles';
import CashBankForm from '@/components/add-transaction/CashBankForm';
import ContraForm from '@/components/add-transaction/ContraForm';
import ExpenseForm from '@/components/add-transaction/ExpenseForm';
import IncomeForm from '@/components/add-transaction/IncomeForm';
import JournalForm from '@/components/add-transaction/JournalForm';

const AddTransactions = () => {

    const transactionTypes = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" },
        { value: "contra", label: "Contra Entry" },
        { value: "journal", label: "Journal Entry" },
        { value: "cash_bank", label: "Cash / Bank Entry" },
    ];

    const [transactionType, setTransactionType] = useState("income");

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">Add Income / Expenses and Journal Entries</h1>
                        <p className="mt-0.5 text-sm text-slate-500">
                            &middot; running on sample data
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className={buttonStyles.primary}
                        >
                            Manage account head
                        </button>
                        <button
                            // onClick={() => setDrawerHead({})}
                            className={buttonStyles.secondary}
                        >
                            View Entries
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="mb-6 rounded-xl border bg-white p-5">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                        Transaction Type
                    </h2>

                    <div className="flex flex-wrap gap-3">
                        {transactionTypes.map((item) => (
                            <label
                                key={item.value}
                                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 transition ${transactionType === item.value
                                    ? "border-teal-600 bg-teal-50 text-teal-700"
                                    : "border-gray-300 hover:border-teal-400"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="transactionType"
                                    value={item.value}
                                    checked={transactionType === item.value}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                    className="h-4 w-4 accent-teal-600"
                                />

                                <span className="font-medium">{item.label}</span>
                            </label>
                        ))}
                    </div>

                    {/* Example */}
                    <div className="mt-6 rounded-lg bg-gray-50 p-4">
                        {transactionType === "income" && <IncomeForm />}

                        {transactionType === "expense" && <ExpenseForm />}

                        {transactionType === "contra" && <ContraForm />}

                        {transactionType === "journal" && <JournalForm />}

                        {transactionType === "cash_bank" && <CashBankForm />}
                    </div>
                </div>




            </div>
        </div>
    )
}

export default AddTransactions;