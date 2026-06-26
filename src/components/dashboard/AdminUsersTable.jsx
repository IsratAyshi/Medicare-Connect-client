'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Magnifier } from '@gravity-ui/icons';
import { updateUserAccountStatus } from '@/lib/actions/admin';
import { toast } from 'react-toastify';

export default function AdminUsersTable({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUpdatingId, setIsUpdatingId] = useState(null);

    const getUserId = (user) => user?._id?.$oid || user?._id || user?.id;

    const handleToggleStatus = async (user) => {
        const userId = getUserId(user);
        const currentStatus = user.status || 'active';
        const targetStatus = currentStatus === 'suspended' ? 'active' : 'suspended';

        setIsUpdatingId(userId);
        try {
            const res = await updateUserAccountStatus(userId, targetStatus);
            if (res?.success) {
                toast.success(`Account status modified to ${targetStatus}!`);
                setUsers(prev =>
                    prev.map(u => getUserId(u) === userId ? { ...u, status: targetStatus } : u)
                );
            } else {
                toast.error("Failed to alter user state restrictions.");
            }
        } catch (error) {
            console.error("Status adjustment transaction failed:", error);
            toast.error("An unexpected error occurred during state modification.");
        } finally {
            setIsUpdatingId(null);
        }
    };

    const filteredUsers = users.filter(user => {
        const query = searchQuery.toLowerCase();
        return (
            user?.name?.toLowerCase().includes(query) ||
            user?.email?.toLowerCase().includes(query)
        );
    });

    const formatRoleTag = (accountRole) => {
        if (accountRole === 'medical_specialist') return { text: 'DOCTOR', styles: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60' };
        if (accountRole === 'patient_family') return { text: 'PATIENT', styles: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60' };
        if (accountRole === 'admin') return { text: 'ADMIN', styles: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200 dark:border-emerald-900/60' };
        return { text: 'USER', styles: 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300' };
    };

    return (
        <div className="w-full">
            {/* Search Input */}
            <div className="p-6 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800/60 flex justify-end">
                <div className="relative w-full sm:w-80">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                        <Magnifier size={18} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search accounts name/email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-[#1e2b3c] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-sm outline-none transition-all focus:border-[#4376C8]"
                    />
                </div>
            </div>

            {filteredUsers.length === 0 ? (
                <div className="w-full py-20 text-center text-sm text-slate-400">
                    No matching user identification records found in the database directory.
                </div>
            ) : (
                <>
                    {/* MOBILE: Card List (visible below lg) */}
                    <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800/40 lg:hidden">
                        {filteredUsers.map((user) => {
                            const userId = getUserId(user);
                            const roleBadge = formatRoleTag(user.accountRole);
                            const isSuspended = user.status === 'suspended';
                            const isLoadingRow = isUpdatingId === userId;

                            return (
                                <div key={userId} className="p-5 flex flex-col gap-4">
                                    {/* Top row: avatar + name + role badge */}
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative shrink-0 border border-slate-100 dark:border-slate-700">
                                                <Image
                                                    src={user?.image || "https://cdn-icons-png.flaticon.com/512/219/219988.png"}
                                                    alt={user.name || 'Profile'}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                            <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                                                {user.name || 'Anonymous User'}
                                            </span>
                                        </div>
                                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wide ${roleBadge.styles}`}>
                                            {roleBadge.text}
                                        </span>
                                    </div>

                                    {/* Detail rows */}
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-0.5">Email</p>
                                            <p className="font-medium text-slate-600 dark:text-zinc-300 truncate">{user.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-0.5">Phone</p>
                                            <p className="font-semibold text-slate-600 dark:text-zinc-400">{user.phoneNumber || 'N/A'}</p>
                                        </div>
                                    </div>

                                    {/* Bottom row: status badge + action button */}
                                    <div className="flex items-center justify-between pt-1">
                                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase ${isSuspended
                                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40'
                                            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40'
                                            }`}>
                                            {user.status || 'active'}
                                        </span>
                                        <button
                                            disabled={isLoadingRow}
                                            onClick={() => handleToggleStatus(user)}
                                            className={`text-xs font-bold px-4 py-1.5 rounded-xl border transition-all duration-200 min-w-[90px] text-center inline-flex justify-center items-center ${isSuspended
                                                ? 'border-amber-200 text-amber-600 hover:bg-amber-50 dark:border-amber-900/60 dark:text-amber-400 dark:hover:bg-amber-950/30'
                                                : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-rose-600 hover:border-rose-200 dark:border-slate-700 dark:text-zinc-400 dark:hover:bg-rose-950/20 dark:hover:text-rose-400 dark:hover:border-rose-900/50'
                                                } disabled:opacity-40`}
                                        >
                                            {isLoadingRow ? (
                                                <span className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                            ) : isSuspended ? 'Unsuspend' : 'Suspend'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* DESKTOP: Table (visible at lg and above) */}
                    <div className="hidden lg:block w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800/40 text-[11px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase bg-slate-50/50 dark:bg-slate-900/10">
                                    <th className="py-4 px-6">Avatars & User</th>
                                    <th className="py-4 px-6">Authorization</th>
                                    <th className="py-4 px-6">Account Email</th>
                                    <th className="py-4 px-6">Contact Phone</th>
                                    <th className="py-4 px-6">System Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                                {filteredUsers.map((user) => {
                                    const userId = getUserId(user);
                                    const roleBadge = formatRoleTag(user.accountRole);
                                    const isSuspended = user.status === 'suspended';
                                    const isLoadingRow = isUpdatingId === userId;

                                    return (
                                        <tr key={userId} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors duration-150">
                                            <td className="py-4 px-6 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative shrink-0 border border-slate-100 dark:border-slate-700">
                                                    <Image
                                                        src={user?.image || "https://cdn-icons-png.flaticon.com/512/219/219988.png"}
                                                        alt={user.name || 'Profile'}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                                <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                                                    {user.name || 'Anonymous User'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wide ${roleBadge.styles}`}>
                                                    {roleBadge.text}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-sm font-medium text-slate-500 dark:text-zinc-400">
                                                {user.email}
                                            </td>
                                            <td className="py-4 px-6 text-sm font-semibold text-slate-600 dark:text-zinc-400 tracking-tight">
                                                {user.phoneNumber || 'N/A'}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase ${isSuspended
                                                    ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40'
                                                    : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40'
                                                    }`}>
                                                    {user.status || 'active'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button
                                                    disabled={isLoadingRow}
                                                    onClick={() => handleToggleStatus(user)}
                                                    className={`text-xs font-bold px-4 py-1.5 rounded-xl border transition-all duration-200 min-w-[90px] text-center inline-flex justify-center items-center ${isSuspended
                                                        ? 'border-amber-200 text-amber-600 hover:bg-amber-50 dark:border-amber-900/60 dark:text-amber-400 dark:hover:bg-amber-950/30'
                                                        : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-rose-600 hover:border-rose-200 dark:border-slate-700 dark:text-zinc-400 dark:hover:bg-rose-950/20 dark:hover:text-rose-400 dark:hover:border-rose-900/50'
                                                        } disabled:opacity-40`}
                                                >
                                                    {isLoadingRow ? (
                                                        <span className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                                    ) : isSuspended ? 'Unsuspend' : 'Suspend'}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}