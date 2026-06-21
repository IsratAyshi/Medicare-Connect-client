"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import DoctorFilters from "./DoctorFilters";
import DoctorCard from "./DoctorCard";

export default function DoctorCatalogContainer({ filters, doctors, total }) {
    const router = useRouter();

    // Syncing state variables with initial URL params
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const [selectedSpecialty, setSelectedSpecialty] = useState(filters.specialty || "all");
    const [sortBy, setSortBy] = useState(filters.sortBy || "fee-asc");
    const [layout, setLayout] = useState("grid"); // 'grid' | 'list' based on image_26bff9.jpg
    const [page, setPage] = useState(filters.page || 1);

    const totalItems = total;
    const itemsPerPage = 12;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = () => {
        if (totalPages <= 1) return [1];
        const pages = [1];

        if (page > 3) pages.push("ellipsis");

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < totalPages - 2) pages.push("ellipsis");

        pages.push(totalPages);
        return pages;
    };

    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

    // Dynamic router side-effects pushing state to URL
    useEffect(() => {
        const sp = new URLSearchParams();

        if (searchQuery) sp.set("search", searchQuery);

        if (selectedSpecialty !== "all") sp.set("specialty", selectedSpecialty);

        if (sortBy !== "fee-asc") sp.set("sortBy", sortBy);

        if (page && page !== 1) sp.set("page", page);

        const path = `?${sp.toString()}`;
        router.push(path);

    }, [router, searchQuery, selectedSpecialty, sortBy, page]);

    // Reset pagination window back to page 1 if search filters change
    // useEffect(() => {
    //     setPage(1);
    // }, [searchQuery, selectedSpecialty, sortBy]);

    return (
        <>
            <DoctorFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSpecialty={selectedSpecialty}
                setSelectedSpecialty={setSelectedSpecialty}
                sortBy={sortBy}
                setSortBy={setSortBy}
                layout={layout}
                setLayout={setLayout}
            />

            <div className="max-w-7xl mx-auto mb-6 text-sm text-slate-500 dark:text-zinc-500">
                Showing {doctors.length} specialist{doctors.length !== 1 && "s"} matches
            </div>

            {doctors.length > 0 ? (
                <>
                    <div className={`max-w-7xl mx-auto grid gap-6 justify-items-center ${layout === "grid"
                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1 w-full"
                        }`}>
                        {doctors.map((doctorItem) => (
                            <DoctorCard
                                key={doctorItem._id?.$oid || doctorItem._id}
                                doctor={doctorItem}
                                layout={layout}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-20 border border-dashed border-slate-300 dark:border-zinc-800 rounded-[32px] max-w-7xl mx-auto bg-white/50 dark:bg-zinc-900/20">
                    <p className="text-slate-500 dark:text-zinc-500 text-lg">
                        No doctors match your search or filter selection.
                    </p>
                </div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
                <div className="max-w-7xl mx-auto mt-12 flex justify-center w-full">
                    <Pagination className="w-full">
                        <Pagination.Summary className="text-slate-600 dark:text-zinc-400">
                            Showing {startItem}-{endItem} of {totalItems} clinicians
                        </Pagination.Summary>
                        <Pagination.Content>
                            <Pagination.Item>
                                <Pagination.Previous
                                    isDisabled={page === 1}
                                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                                    className="bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800"
                                >
                                    <Pagination.PreviousIcon />
                                    <span>Previous</span>
                                </Pagination.Previous>
                            </Pagination.Item>

                            {getPageNumbers().map((p, i) =>
                                p === "ellipsis" ? (
                                    <Pagination.Item key={`ellipsis-${i}`}>
                                        <Pagination.Ellipsis className="text-slate-400 dark:text-zinc-600" />
                                    </Pagination.Item>
                                ) : (
                                    <Pagination.Item key={p}>
                                        <Pagination.Link
                                            isActive={p === page}
                                            onPress={() => setPage(p)}
                                            className={`${p === page ? "bg-emerald-600 text-white" : "bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300"}`}
                                        >
                                            {p}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                )
                            )}

                            <Pagination.Item>
                                <Pagination.Next
                                    isDisabled={page === totalPages}
                                    onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    className="bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800"
                                >
                                    <span>Next</span>
                                    <Pagination.NextIcon />
                                </Pagination.Next>
                            </Pagination.Item>
                        </Pagination.Content>
                    </Pagination>
                </div>
            )}
        </>
    );
}