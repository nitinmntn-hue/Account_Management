export default function TransactionsPage() {
    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold">
                    Transactions
                </h1>

                <p className="text-gray-500 mt-1">
                    View and manage all income, expenses, deposits, withdrawals, and contra vouchers.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">

                <div className="flex justify-between mb-6">

                    <input
                        type="text"
                        placeholder="Search transaction..."
                        className="border rounded-lg px-4 py-2 w-80"
                    />

                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
                        + Add Transaction
                    </button>

                </div>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">Date</th>

                            <th className="text-left">Type</th>

                            <th className="text-left">Account</th>

                            <th className="text-left">Remark</th>

                            <th className="text-right">Amount</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr className="border-b">

                            <td className="py-3">07 Jul 2026</td>

                            <td className="text-green-600">
                                Income
                            </td>

                            <td>Cash</td>

                            <td>Product Sale</td>

                            <td className="text-right">
                                ₹10,000
                            </td>

                        </tr>

                        <tr>

                            <td className="py-3">07 Jul 2026</td>

                            <td className="text-red-600">
                                Expense
                            </td>

                            <td>Bank</td>

                            <td>Electricity Bill</td>

                            <td className="text-right">
                                ₹2,500
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}