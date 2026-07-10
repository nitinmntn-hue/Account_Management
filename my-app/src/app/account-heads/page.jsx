"use client";

import { useMemo, useState } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    Layers,
    ChevronDown,
    AlertTriangle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const ACCOUNT_TYPES = ["Asset", "Liability", "Equity", "Income", "Expense"];

const TYPE_STYLES = {
    Asset: "bg-teal-50 text-teal-700 border-teal-200",
    Liability: "bg-amber-50 text-amber-700 border-amber-200",
    Equity: "bg-violet-50 text-violet-700 border-violet-200",
    Income: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Expense: "bg-rose-50 text-rose-700 border-rose-200",
};

/* ------------------------------------------------------------------ */
/*  Dummy seed data — swap for API calls later                        */
/*  GET  /api/account-groups   GET  /api/account-heads                */
/*  POST/PUT/DELETE follow the same pattern on the handlers below     */
/* ------------------------------------------------------------------ */

const SEED_GROUPS = [
    { id: "g1", name: "Cash & Bank", type: "Asset" },
    { id: "g2", name: "Current Assets", type: "Asset" },
    { id: "g3", name: "Fixed Assets", type: "Asset" },
    { id: "g4", name: "Current Liabilities", type: "Liability" },
    { id: "g5", name: "Loans", type: "Liability" },
    { id: "g6", name: "Owner's Equity", type: "Equity" },
    { id: "g7", name: "Sales Income", type: "Income" },
    { id: "g8", name: "Other Income", type: "Income" },
    { id: "g9", name: "Direct Expense", type: "Expense" },
    { id: "g10", name: "Indirect Expense", type: "Expense" },
    { id: "g11", name: "Staff Salary", type: "Expense" },
];

const SEED_HEADS = [
    { id: "h1", code: "AC-1001", name: "Cash in Hand", groupId: "g1", openingBalance: 25000, balanceType: "Debit", status: "Active", description: "Petty cash kept at the counter" },
    { id: "h2", code: "AC-1002", name: "HDFC Bank - Current A/c", groupId: "g1", openingBalance: 480000, balanceType: "Debit", status: "Active", description: "" },
    { id: "h3", code: "AC-1003", name: "Accounts Receivable", groupId: "g2", openingBalance: 132500, balanceType: "Debit", status: "Active", description: "Outstanding from customers" },
    { id: "h4", code: "AC-1004", name: "Furniture & Fixtures", groupId: "g3", openingBalance: 95000, balanceType: "Debit", status: "Active", description: "" },
    { id: "h5", code: "AC-1005", name: "Accounts Payable", groupId: "g4", openingBalance: 76200, balanceType: "Credit", status: "Active", description: "Outstanding to vendors" },
    { id: "h6", code: "AC-1006", name: "Bank Loan - Term Loan", groupId: "g5", openingBalance: 300000, balanceType: "Credit", status: "Active", description: "" },
    { id: "h7", code: "AC-1007", name: "Capital Account", groupId: "g6", openingBalance: 500000, balanceType: "Credit", status: "Active", description: "" },
    { id: "h8", code: "AC-1008", name: "Sales Revenue", groupId: "g7", openingBalance: 0, balanceType: "Credit", status: "Active", description: "" },
    { id: "h9", code: "AC-1009", name: "Interest Income", groupId: "g8", openingBalance: 0, balanceType: "Credit", status: "Active", description: "" },
    { id: "h10", code: "AC-1010", name: "Rent Expense", groupId: "g10", openingBalance: 0, balanceType: "Debit", status: "Active", description: "" },
    { id: "h11", code: "AC-1011", name: "Office Supplies", groupId: "g10", openingBalance: 0, balanceType: "Debit", status: "Inactive", description: "Merged into Indirect Expense" },
    { id: "h12", code: "AC-1012", name: "Staff Salary - July", groupId: "g11", openingBalance: 0, balanceType: "Debit", status: "Active", description: "" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const formatCurrency = (n) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);

const nextCode = (heads) => {
    const nums = heads.map((h) => parseInt(h.code.replace("AC-", ""), 10)).filter((n) => !Number.isNaN(n));
    const max = nums.length ? Math.max(...nums) : 1000;
    return `AC-${max + 1}`;
};

const uid = (prefix) => `${prefix}${Math.random().toString(36).slice(2, 9)}`;

/* ------------------------------------------------------------------ */
/*  Small UI atoms                                                     */
/* ------------------------------------------------------------------ */

function TypeBadge({ type }) {
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${TYPE_STYLES[type] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
            {type}
        </span>
    );
}

function StatusPill({ status }) {
    const active = status === "Active";
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-slate-400"}`} />
            {status}
        </span>
    );
}

function IconButton({ onClick, label, tone = "slate", children }) {
    const tones = {
        slate: "text-slate-500 hover:text-slate-800 hover:bg-slate-100",
        rose: "text-slate-500 hover:text-rose-600 hover:bg-rose-50",
    };
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${tones[tone]}`}
        >
            {children}
        </button>
    );
}

function Field({ label, required, children, hint }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
                {label}
                {required && <span className="text-rose-500"> *</span>}
            </span>
            {children}
            {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
        </label>
    );
}

const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-100";

/* ------------------------------------------------------------------ */
/*  Delete confirmation dialog                                         */
/* ------------------------------------------------------------------ */

function ConfirmDialog({ title, message, onCancel, onConfirm, confirmLabel = "Delete" }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                        <AlertTriangle size={18} />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{message}</p>
                    </div>
                </div>
                <div className="mt-5 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-rose-700"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Account Groups dialog (list + inline add/edit)                     */
/* ------------------------------------------------------------------ */

function GroupsDialog({ groups, headsCountByGroup, onClose, onSave, onDelete }) {
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ name: "", type: "Asset" });
    const [pendingDelete, setPendingDelete] = useState(null);

    const startAdd = () => {
        setEditingId("new");
        setForm({ name: "", type: "Asset" });
    };

    const startEdit = (group) => {
        setEditingId(group.id);
        setForm({ name: group.name, type: group.type });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm({ name: "", type: "Asset" });
    };

    const submit = () => {
        if (!form.name.trim()) return;
        onSave(editingId === "new" ? null : editingId, form);
        cancelEdit();
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div className="flex items-center gap-2">
                        <Layers size={18} className="text-teal-700" />
                        <h2 className="text-sm font-semibold text-slate-900">Account groups</h2>
                    </div>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4">
                    <ul className="divide-y divide-slate-100">
                        {groups.map((g) => (
                            <li key={g.id} className="flex items-center justify-between gap-3 py-2.5">
                                {editingId === g.id ? (
                                    <div className="flex flex-1 flex-wrap items-center gap-2">
                                        <input
                                            autoFocus
                                            value={form.name}
                                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                            className={`${inputClass} flex-1 min-w-[140px]`}
                                        />
                                        <select
                                            value={form.type}
                                            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                                            className={`${inputClass} w-32`}
                                        >
                                            {ACCOUNT_TYPES.map((t) => (
                                                <option key={t}>{t}</option>
                                            ))}
                                        </select>
                                        <button onClick={submit} className="rounded-lg bg-teal-700 px-3 py-2 text-xs font-medium text-white hover:bg-teal-800">
                                            Save
                                        </button>
                                        <button onClick={cancelEdit} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-slate-800">{g.name}</p>
                                            <p className="text-xs text-slate-400">{headsCountByGroup[g.id] || 0} head(s)</p>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-2">
                                            <TypeBadge type={g.type} />
                                            <IconButton label="Edit group" onClick={() => startEdit(g)}>
                                                <Pencil size={15} />
                                            </IconButton>
                                            <IconButton label="Delete group" tone="rose" onClick={() => setPendingDelete(g)}>
                                                <Trash2 size={15} />
                                            </IconButton>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>

                    {editingId === "new" ? (
                        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-slate-300 p-3">
                            <input
                                autoFocus
                                placeholder="New group name"
                                value={form.name}
                                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                className={`${inputClass} flex-1 min-w-[140px]`}
                            />
                            <select
                                value={form.type}
                                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                                className={`${inputClass} w-32`}
                            >
                                {ACCOUNT_TYPES.map((t) => (
                                    <option key={t}>{t}</option>
                                ))}
                            </select>
                            <button onClick={submit} className="rounded-lg bg-teal-700 px-3 py-2 text-xs font-medium text-white hover:bg-teal-800">
                                Add
                            </button>
                            <button onClick={cancelEdit} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={startAdd}
                            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 py-2.5 text-sm font-medium text-teal-700 hover:border-teal-400 hover:bg-teal-50"
                        >
                            <Plus size={16} /> Add group
                        </button>
                    )}
                </div>
            </div>

            {pendingDelete && (
                <ConfirmDialog
                    title={`Delete "${pendingDelete.name}"?`}
                    message={
                        headsCountByGroup[pendingDelete.id]
                            ? `${headsCountByGroup[pendingDelete.id]} account head(s) use this group. Reassign or delete them first.`
                            : "This action can't be undone."
                    }
                    confirmLabel={headsCountByGroup[pendingDelete.id] ? "OK" : "Delete"}
                    onCancel={() => setPendingDelete(null)}
                    onConfirm={() => {
                        if (!headsCountByGroup[pendingDelete.id]) onDelete(pendingDelete.id);
                        setPendingDelete(null);
                    }}
                />
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Account Head drawer (add / edit)                                   */
/* ------------------------------------------------------------------ */

function HeadDrawer({ head, groups, heads, onClose, onSave }) {
    const isEdit = Boolean(head);
    const [form, setForm] = useState(
        head || {
            code: nextCode(heads),
            name: "",
            groupId: groups[0]?.id || "",
            openingBalance: 0,
            balanceType: "Debit",
            status: "Active",
            description: "",
        }
    );
    const [error, setError] = useState("");

    const selectedGroup = groups.find((g) => g.id === form.groupId);

    const submit = () => {
        if (!form.name.trim()) return setError("Account head name is required.");
        if (!form.groupId) return setError("Choose an account group.");
        onSave({ ...form, id: head?.id || uid("h"), openingBalance: Number(form.openingBalance) || 0 });
    };

    return (
        <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/40">
            <div className="flex h-full w-full max-w-md flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <h2 className="text-sm font-semibold text-slate-900">{isEdit ? "Edit account head" : "Add account head"}</h2>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                    {error && (
                        <div className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">{error}</div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Code" required>
                            <input
                                value={form.code}
                                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                                className={`${inputClass} font-mono`}
                            />
                        </Field>
                        <Field label="Status">
                            <select
                                value={form.status}
                                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                                className={inputClass}
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </Field>
                    </div>

                    <Field label="Account head name" required>
                        <input
                            autoFocus
                            placeholder="e.g. Cash in Hand"
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Account group" required>
                        <select
                            value={form.groupId}
                            onChange={(e) => setForm((f) => ({ ...f, groupId: e.target.value }))}
                            className={inputClass}
                        >
                            {groups.map((g) => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Type" hint="Derived from the selected group">
                        <div>{selectedGroup && <TypeBadge type={selectedGroup.type} />}</div>
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Opening balance">
                            <input
                                type="number"
                                value={form.openingBalance}
                                onChange={(e) => setForm((f) => ({ ...f, openingBalance: e.target.value }))}
                                className={`${inputClass} font-mono`}
                            />
                        </Field>
                        <Field label="Balance type">
                            <select
                                value={form.balanceType}
                                onChange={(e) => setForm((f) => ({ ...f, balanceType: e.target.value }))}
                                className={inputClass}
                            >
                                <option>Debit</option>
                                <option>Credit</option>
                            </select>
                        </Field>
                    </div>

                    <Field label="Description">
                        <textarea
                            rows={3}
                            placeholder="Optional notes about this account head"
                            value={form.description}
                            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                            className={inputClass}
                        />
                    </Field>
                </div>

                <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
                    <button onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Cancel
                    </button>
                    <button onClick={submit} className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800">
                        {isEdit ? "Save changes" : "Add account head"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                           */
/* ------------------------------------------------------------------ */

export default function AccountHeadsPage() {
    const [groups, setGroups] = useState(SEED_GROUPS);
    const [heads, setHeads] = useState(SEED_HEADS);

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [groupFilter, setGroupFilter] = useState("All");

    const [drawerHead, setDrawerHead] = useState(null); // null closed, {} new, {...} edit
    const [groupsDialogOpen, setGroupsDialogOpen] = useState(false);
    const [pendingDeleteHead, setPendingDeleteHead] = useState(null);

    const groupsById = useMemo(() => Object.fromEntries(groups.map((g) => [g.id, g])), [groups]);

    const headsCountByGroup = useMemo(() => {
        const map = {};
        heads.forEach((h) => (map[h.groupId] = (map[h.groupId] || 0) + 1));
        return map;
    }, [heads]);

    const filteredHeads = useMemo(() => {
        return heads.filter((h) => {
            const group = groupsById[h.groupId];
            const matchesSearch =
                !search.trim() ||
                h.name.toLowerCase().includes(search.toLowerCase()) ||
                h.code.toLowerCase().includes(search.toLowerCase());
            const matchesType = typeFilter === "All" || group?.type === typeFilter;
            const matchesGroup = groupFilter === "All" || h.groupId === groupFilter;
            return matchesSearch && matchesType && matchesGroup;
        });
    }, [heads, groupsById, search, typeFilter, groupFilter]);

    /* ---- head handlers -------------------------------------------- */
    // TODO: replace with POST /api/account-heads, PUT /api/account-heads/:id
    const saveHead = (data) => {
        setHeads((prev) => {
            const exists = prev.some((h) => h.id === data.id);
            return exists ? prev.map((h) => (h.id === data.id ? data : h)) : [data, ...prev];
        });
        setDrawerHead(null);
    };

    // TODO: replace with DELETE /api/account-heads/:id
    const deleteHead = (id) => {
        setHeads((prev) => prev.filter((h) => h.id !== id));
        setPendingDeleteHead(null);
    };

    /* ---- group handlers ---------------------------------------------- */
    // TODO: replace with POST /api/account-groups, PUT /api/account-groups/:id
    const saveGroup = (id, data) => {
        if (id) {
            setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, ...data } : g)));
        } else {
            setGroups((prev) => [...prev, { id: uid("g"), ...data }]);
        }
    };

    // TODO: replace with DELETE /api/account-groups/:id
    const deleteGroup = (id) => setGroups((prev) => prev.filter((g) => g.id !== id));

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">Account heads</h1>
                        <p className="mt-0.5 text-sm text-slate-500">
                            {heads.length} heads across {groups.length} groups &middot; running on sample data
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setGroupsDialogOpen(true)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            <Layers size={16} /> Manage groups
                        </button>
                        <button
                            onClick={() => setDrawerHead({})}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-teal-800"
                        >
                            <Plus size={16} /> Add account head
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[220px]">
                        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or code"
                            className={`${inputClass} pl-9`}
                        />
                    </div>

                    <div className="relative">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className={`${inputClass} w-40 appearance-none pr-8`}
                        >
                            <option value="All">All types</option>
                            {ACCOUNT_TYPES.map((t) => (
                                <option key={t}>{t}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative">
                        <select
                            value={groupFilter}
                            onChange={(e) => setGroupFilter(e.target.value)}
                            className={`${inputClass} w-48 appearance-none pr-8`}
                        >
                            <option value="All">All groups</option>
                            {groups.map((g) => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                    <th className="px-4 py-3 font-medium">Code</th>
                                    <th className="px-4 py-3 font-medium">Name</th>
                                    <th className="px-4 py-3 font-medium">Group</th>
                                    <th className="px-4 py-3 font-medium">Type</th>
                                    <th className="px-4 py-3 text-right font-medium">Opening balance</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredHeads.map((h) => {
                                    const group = groupsById[h.groupId];
                                    return (
                                        <tr key={h.id} className="hover:bg-slate-50/60">
                                            <td className="px-4 py-3 font-mono text-xs text-slate-500">{h.code}</td>
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-slate-800">{h.name}</p>
                                                {h.description && <p className="text-xs text-slate-400">{h.description}</p>}
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">{group?.name || "—"}</td>
                                            <td className="px-4 py-3">{group && <TypeBadge type={group.type} />}</td>
                                            <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-700">
                                                {formatCurrency(h.openingBalance)}
                                                <span className="ml-1 text-xs text-slate-400">{h.balanceType === "Debit" ? "Dr" : "Cr"}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <StatusPill status={h.status} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-1">
                                                    <IconButton label="Edit head" onClick={() => setDrawerHead(h)}>
                                                        <Pencil size={15} />
                                                    </IconButton>
                                                    <IconButton label="Delete head" tone="rose" onClick={() => setPendingDeleteHead(h)}>
                                                        <Trash2 size={15} />
                                                    </IconButton>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {filteredHeads.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-400">
                                            No account heads match your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Drawer: add / edit head */}
            {drawerHead !== null && (
                <HeadDrawer
                    head={Object.keys(drawerHead).length ? drawerHead : null}
                    groups={groups}
                    heads={heads}
                    onClose={() => setDrawerHead(null)}
                    onSave={saveHead}
                />
            )}

            {/* Dialog: manage groups */}
            {groupsDialogOpen && (
                <GroupsDialog
                    groups={groups}
                    headsCountByGroup={headsCountByGroup}
                    onClose={() => setGroupsDialogOpen(false)}
                    onSave={saveGroup}
                    onDelete={deleteGroup}
                />
            )}

            {/* Confirm: delete head */}
            {pendingDeleteHead && (
                <ConfirmDialog
                    title={`Delete "${pendingDeleteHead.name}"?`}
                    message="This account head will be permanently removed. This action can't be undone."
                    onCancel={() => setPendingDeleteHead(null)}
                    onConfirm={() => deleteHead(pendingDeleteHead.id)}
                />
            )}
        </div>
    );
}