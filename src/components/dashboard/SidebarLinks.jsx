'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    CalendarDays,
    CreditCard,
    Star,
    UserRound,
    ChevronRight,
    ChartColumn,
    UsersRound,
    CircleCheck,
    SquareChartGantt,
    Syringe,
    CircleDollarSign
} from 'lucide-react';

import { CiBadgeDollar } from "react-icons/ci";

// Map string keys to your actual Lucide components
const iconMap = {
    LayoutDashboard,
    CalendarDays,
    CreditCard,
    Star,
    UserRound,
    CiBadgeDollar,
    ChartColumn,
    UsersRound,
    CircleCheck,
    SquareChartGantt,
    Syringe,
    CircleDollarSign

};



const SidebarLinks = ({ links, baseRolePath }) => {
    const pathname = usePathname();

    return (
        <nav className="flex-1 flex flex-col gap-1.5">
            {links.map((link, index) => {
                // Resolve the component from our string map safely
                const IconComponent = iconMap[link.icon] || LayoutDashboard;

                const isActive = pathname === link.href || (link.name === 'Overview' && pathname === baseRolePath);

                return (
                    <Link
                        key={index}
                        href={link.href}
                        className={`group flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-[500] transition-all duration-200 ${isActive
                            ? 'bg-[#d7e2ff] text-[#003f83] dark:bg-blue-800/60 dark:text-blue-400 font-[600]'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                            }`}
                    >
                        <div className="flex items-center gap-3.5">
                            <IconComponent
                                size={20}
                                className={`transition-colors duration-200 ${isActive ? 'text-[#003f83] dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                                    }`}
                            />
                            <span className="hidden md:block font-manrope text-[15px] tracking-wide">{link.name}</span>
                        </div>

                        {link.badge ? (
                            <span className="bg-[#003f83] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {link.badge}
                            </span>
                        ) : (
                            <ChevronRight
                                size={16}
                                className={`transition-transform opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 ${isActive ? 'text-[#003f83] dark:text-blue-400 opacity-100' : 'text-slate-400'
                                    }`}
                            />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
};

export default SidebarLinks;