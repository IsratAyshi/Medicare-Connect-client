import React from "react";
import { TextField, InputGroup, Select, ListBox } from "@heroui/react";
import { Magnifier, ChevronDown, LayoutCells, LayoutList } from "@gravity-ui/icons";

export default function DoctorFilters({
    searchQuery,
    setSearchQuery,
    selectedSpecialty,
    setSelectedSpecialty,
    sortBy,
    setSortBy,
    layout,
    setLayout
}) {
    return (
        <div className="flex flex-col gap-4 bg-[#ECF0FF] dark:bg-[#001B3F]/50 p-6 rounded-[24px] border border-slate-200/80 dark:border-zinc-800/80 max-w-7xl mx-auto mb-10 shadow-sm dark:shadow-none">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

                {/* 1. Search Doctor Name */}
                <div className="md:col-span-4">
                    <TextField
                        value={searchQuery}
                        onChange={(value) => setSearchQuery(value)}
                        className="w-full"
                    >
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-2">Search Doctor Name</span>
                        <InputGroup className="bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 focus-within:border-emerald-500 rounded-xl transition-all">
                            <InputGroup.Prefix className="pl-3 text-slate-400 dark:text-zinc-500">
                                <Magnifier className="w-4 h-4" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                placeholder="e.g. Amanda Ross..."
                                className="bg-transparent text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 text-sm py-2.5 px-3 outline-none w-full"
                            />
                        </InputGroup>
                    </TextField>
                </div>

                {/* 2. Medical Specialties */}
                <div className="md:col-span-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-2">Medical Speciality</span>
                    <Select
                        selectedKey={selectedSpecialty}
                        onSelectionChange={(key) => setSelectedSpecialty(key)}
                    >
                        <Select.Trigger className="w-full flex items-center justify-between bg-slate-50 dark:bg-zinc-800 text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600 rounded-xl py-2.5 px-4 text-sm font-normal transition-all">
                            <Select.Value>
                                {selectedSpecialty === "all" ? "All Specializations" : selectedSpecialty.replace("-", " ")}
                            </Select.Value>
                            <Select.Indicator>
                                <ChevronDown className="w-4 h-4 text-slate-400 dark:text-zinc-400" />
                            </Select.Indicator>
                        </Select.Trigger>

                        <Select.Popover className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl shadow-xl mt-1 overflow-hidden z-50">
                            <ListBox className="p-1">
                                {["all", "general-medicine", "pediatrics", "orthopedics", "cardiology", "neurology", "dermatology", "gynecology"].map((spec) => (
                                    <ListBox.Item
                                        key={spec}
                                        id={spec}
                                        className="flex items-center justify-between text-slate-700 dark:text-zinc-200 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer capitalize"
                                    >
                                        <span>{spec === "all" ? "All Specializations" : spec.replace("-", " ")}</span>
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* 3. Sort Filter */}
                <div className="md:col-span-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-2">Sort by Fee / Experience</span>
                    <Select
                        selectedKey={sortBy}
                        onSelectionChange={(key) => setSortBy(key)}
                    >
                        <Select.Trigger className="w-full flex items-center justify-between bg-slate-50 dark:bg-zinc-800 text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600 rounded-xl py-2.5 px-4 text-sm font-normal transition-all">
                            <Select.Value>
                                {sortBy === "fee-asc" && "Fee: Low to High"}
                                {sortBy === "fee-desc" && "Fee: High to Low"}
                                {sortBy === "experience-desc" && "Experience: High to Low"}
                            </Select.Value>
                            <Select.Indicator>
                                <ChevronDown className="w-4 h-4 text-slate-400 dark:text-zinc-400" />
                            </Select.Indicator>
                        </Select.Trigger>

                        <Select.Popover className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl shadow-xl mt-1 overflow-hidden z-50">
                            <ListBox className="p-1">
                                <ListBox.Item id="fee-asc" className="text-slate-700 dark:text-zinc-200 hover:bg-emerald-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                    Fee: Low to High
                                </ListBox.Item>
                                <ListBox.Item id="fee-desc" className="text-slate-700 dark:text-zinc-200 hover:bg-emerald-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                    Fee: High to Low
                                </ListBox.Item>
                                <ListBox.Item id="experience-desc" className="text-slate-700 dark:text-zinc-200 hover:bg-emerald-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">
                                    Experience: High to Low
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* 4. Layout Toggles */}
                <div className="md:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-2">Layout Format</span>
                    <div className="flex bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl border border-slate-200 dark:border-zinc-700 w-full h-[46px]">
                        <button
                            onClick={() => setLayout("grid")}
                            className={`flex-1 flex items-center justify-center rounded-lg transition-all ${layout === "grid" ? "bg-white dark:bg-zinc-700 text-emerald-600 dark:text-white shadow-sm" : "text-slate-400 dark:text-zinc-500"}`}
                        >
                            <LayoutCells className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setLayout("list")}
                            className={`flex-1 flex items-center justify-center rounded-lg transition-all ${layout === "list" ? "bg-white dark:bg-zinc-700 text-emerald-600 dark:text-white shadow-sm" : "text-slate-400 dark:text-zinc-500"}`}
                        >
                            <LayoutList className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}