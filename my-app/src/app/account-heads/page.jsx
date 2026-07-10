"use client";

import { useMemo, useState } from "react";

import HeadToolbar from "@/components/account-heads/HeadToolbar";
import HeadTable from "@/components/account-heads/HeadTable";
import HeadDrawer from "@/components/account-heads/HeadDrawer";
import DeleteDialog from "@/components/account-heads/DeleteDialog";

export default function AccountHeadsPage() {
    const [heads, setHeads] = useState([
        {
            id: 1,
            name: "Sales Income",
            type: "Income",
            group: "Direct Income",
            description: "Product sales",
            status: true,
        },
        {
            id: 2,
            name: "Interest Income",
            type: "Income",
            group: "Indirect Income",
            description: "Bank interest",
            status: true,
        },
        {
            id: 3,
            name: "Salary",
            type: "Expense",
            group: "Direct Expense",
            description: "Employee salary",
            status: true,
        },
        {
            id: 4,
            name: "Electricity",
            type: "Expense",
            group: "Indirect Expense",
            description: "Office electricity",
            status: false,
        },
    ]);

    // Filters
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [group, setGroup] = useState("");

    // Drawer
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingHead, setEditingHead] = useState(null);

    // Delete Dialog
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedHead, setSelectedHead] = useState(null);

    // Filtered Data
    const filteredHeads = useMemo(() => {
        return heads.filter((head) => {
            const matchSearch =
                head.name.toLowerCase().includes(search.toLowerCase());

            const matchType =
                type === "" || head.type === type;

            const matchGroup =
                group === "" || head.group === group;

            return matchSearch && matchType && matchGroup;
        });
    }, [heads, search, type, group]);

    // Add
    const handleAdd = () => {
        setEditingHead(null);
        setDrawerOpen(true);
    };

    // Edit
    const handleEdit = (row) => {
        setEditingHead(row);
        setDrawerOpen(true);
    };

    // Save
    const handleSubmit = (form) => {
        if (editingHead) {
            setHeads((prev) =>
                prev.map((item) =>
                    item.id === editingHead.id
                        ? {
                            ...editingHead,
                            ...form,
                        }
                        : item
                )
            );
        } else {
            setHeads((prev) => [
                {
                    id: Date.now(),
                    ...form,
                },
                ...prev,
            ]);
        }

        setDrawerOpen(false);
        setEditingHead(null);
    };

    // Delete
    const handleDelete = (row) => {
        setSelectedHead(row);
        setDeleteOpen(true);
    };

    const confirmDelete = () => {
        setHeads((prev) =>
            prev.filter((item) => item.id !== selectedHead.id)
        );

        setDeleteOpen(false);
        setSelectedHead(null);
    };

    return (
        <div className="space-y-6">

            <HeadToolbar
                search={search}
                setSearch={setSearch}
                type={type}
                setType={setType}
                group={group}
                setGroup={setGroup}
                onAdd={handleAdd}
                onReset={() => {
                    setSearch("");
                    setType("");
                    setGroup("");
                }}
            />

            <HeadTable
                data={filteredHeads}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <HeadDrawer
                open={drawerOpen}
                editingData={editingHead}
                onClose={() => {
                    setDrawerOpen(false);
                    setEditingHead(null);
                }}
                onSubmit={handleSubmit}
            />

            <DeleteDialog
                open={deleteOpen}
                item={selectedHead}
                onClose={() => setDeleteOpen(false)}
                onConfirm={confirmDelete}
            />

        </div>
    );
}