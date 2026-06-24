import React from 'react';

import AdminUsersTable from '@/components/dashboard/AdminUsersTable';
import { getAllSystemUsers } from '@/lib/api/admin';

export default async function ManageUsersPage() {
    // Fetch data safely on the server side
    const users = await getAllSystemUsers() || [];

    return (
        <div className="w-full bg-[#f8f9ff] dark:bg-[#0D1C2D] min-h-screen p-6 sm:p-10 font-manrope">
            <div className="max-w-[1400px] mx-auto bg-white dark:bg-[#001e3d] rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm overflow-hidden">

                {/* Header Title Bar */}
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 dark:border-slate-800/60 gap-4">
                    <div>
                        <h1 className="text-2xl font-[800] text-slate-800 dark:text-white tracking-tight">
                            Registered System Accounts ({users.length})
                        </h1>
                        <p className="text-sm font-medium text-slate-400 dark:text-zinc-400 mt-1">
                            Manage access privileges, track authorization roles, and view live medical logs.
                        </p>
                    </div>
                </div>

                {/* Data Table Core Client Wrapper */}
                <AdminUsersTable initialUsers={users} />

            </div>
        </div>
    );
}