import React from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

const UnauthorizedPage = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-[rgb(35,49,67)] px-4 transition-colors duration-200 mt-20">
            <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/20 shadow-sm">

                {/* Alert Icon Display Area */}
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400">
                    <ShieldAlert className="w-9 h-9" />
                </div>

                {/* Core Header Typography */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                        Unauthorized Access
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
                        You do not have the required profile credentials to view this account portal or specific dashboard menu section.
                    </p>
                </div>

                {/* Action Controls redirection block */}
                <div className="pt-2">
                    <Link
                        href="/"
                        className="inline-block bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs tracking-wide uppercase px-6 py-3 rounded-xl transition-all shadow-sm"
                    >
                        Return to Homepage
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default UnauthorizedPage;