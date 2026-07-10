"use client";

import {
    Search,
    Plus,
    RotateCcw,
    FolderTree,
} from "lucide-react";

export default function HeadToolbar({
    search,
    setSearch,

    type,
    setType,

    group,
    setGroup,

    groups = [],

    onAdd,
    onManageGroups,

    onReset,
}) {
    const filteredGroups =
        type === ""
            ? groups
            : groups.filter((g) => g.type === type && g.status);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}

            <div className="flex flex-col gap-4 border-b p-6 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Account Heads
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage account heads & account groups
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">

                    <button
                        onClick={onManageGroups}
                        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium transition hover:bg-gray-100"
                    >
                        <FolderTree size={18} />

                        Account Groups
                    </button>

                    <button
                        onClick={onAdd}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        <Plus size={18} />

                        Add Head
                    </button>

                </div>

            </div>

            {/* Filters */}

            <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">

                {/* Search */}

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search account head..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                    />

                </div>

                {/* Type */}

                <select
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value);
                        setGroup("");
                    }}
                    className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                >
                    <option value="">All Types</option>

                    <option value="Income">
                        Income
                    </option>

                    <option value="Expense">
                        Expense
                    </option>

                </select>

                {/* Group */}

                <select
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                >
                    <option value="">
                        All Groups
                    </option>

                    {filteredGroups.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.name}
                        </option>
                    ))}

                </select>

                {/* Reset */}

                <button
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition hover:bg-gray-100"
                >
                    <RotateCcw size={18} />

                    Reset Filters
                </button>

            </div>

        </div>
    );
}