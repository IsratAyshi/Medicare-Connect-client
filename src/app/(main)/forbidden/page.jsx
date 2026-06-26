import React from 'react';
import Link from 'next/link';
import { ShieldX } from 'lucide-react';


const ForbiddenPage = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-[rgb(35,49,67)] px-4 transition-colors duration-200 mt-20">
            <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/20 shadow-sm">

                {/* Blocked Shield Icon Display Area */}
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400">
                    <ShieldX className="w-9 h-9" />
                </div>

                {/* Core Header Typography */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                        Access Forbidden
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
                        Your identity is authenticated, but your account role does not have administrative clearance to access this secure database endpoint.
                    </p>
                </div>

                {/* Action Controls Redirection Blocks */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Link
                        href="/"
                        className="w-full sm:w-auto text-center bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs tracking-wide uppercase px-6 py-3 rounded-xl transition-all shadow-sm"
                    >
                        Return Home
                    </Link>

                    <Link
                        href="/auth/login"
                        className="w-full sm:w-auto text-center border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-semibold text-xs tracking-wide uppercase px-6 py-3 rounded-xl transition-all shadow-sm"
                    >
                        Switch Account
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ForbiddenPage;