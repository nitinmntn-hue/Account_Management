"use client";

import {
    Pencil,
    Trash2,
    TrendingUp,
    TrendingDown,
    BadgeCheck,
    BadgeX,
} from "lucide-react";

export default function GroupTable({
    data = [],
    onEdit,
    onDelete,
}) {
    if (data.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                    No Account Groups Found
                </h3>

                <p className="mt-2 text-gray-500">
                    Click <strong>Add Group</strong> to create your first account group.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full">

                    {/* Header */}

                    <thead className="bg-gray-50">
                        <tr className="text-sm font-semibold text-gray-700">

                            <th className="px-5 py-4 text-left">
                                #
                            </th>

                            <th className="px-5 py-4 text-left">
                                Group Name
                            </th>

                            <th className="px-5 py-4 text-left">
                                Type
                            </th>

                            <th className="px-5 py-4 text-center">
                                Status
                            </th>

                            <th className="px-5 py-4 text-center">
                                Actions
                            </th>

                        </tr>
                    </thead>

                    {/* Body */}

                    <tbody>

                        {data.map((group, index) => (
                            <tr
                                key={group.id}
                                className="border-t hover:bg-gray-50 transition"
                            >

                                <td className="px-5 py-4 font-medium">
                                    {index + 1}
                                </td>

                                <td className="px-5 py-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            {group.name}
                                        </h4>

                                        <p className="text-xs text-gray-500">
                                            ID : {group.id}
                                        </p>
                                    </div>
                                </td>

                                {/* Type */}

                                <td className="px-5 py-4">

                                    {group.type === "Income" ? (

                                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

                                            <TrendingUp size={16} />

                                            Income

                                        </span>

                                    ) : (

                                        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">

                                            <TrendingDown size={16} />

                                            Expense

                                        </span>

                                    )}

                                </td>

                                {/* Status */}

                                <td className="px-5 py-4 text-center">

                                    {group.status ? (

                                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

                                            <BadgeCheck size={16} />

                                            Active

                                        </span>

                                    ) : (

                                        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">

                                            <BadgeX size={16} />

                                            Inactive

                                        </span>

                                    )}

                                </td>

                                {/* Actions */}

                                <td className="px-5 py-4">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => onEdit(group)}
                                            className="rounded-lg bg-yellow-100 p-2 text-yellow-600 transition hover:bg-yellow-200"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            onClick={() => onDelete(group)}
                                            className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </div>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    );
}