'use client';

import { useState, useEffect } from 'react';
import { Link, Button, Avatar } from "@heroui/react";
// Import Gravity UI Icon components
import { HeartPulse, Bars, Xmark, Sun, Moon } from '@gravity-ui/icons';
import Image from 'next/image';
import { ThemeSwitch } from '../ThemeSwitch';
import { authClient } from '@/lib/auth-client';
import { LayoutDashboard } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const {
        data: session,
        isPending
    } = authClient.useSession();

    const user = session?.user;

    // console.log(user);

    const handleSignOut = async () => {
        await authClient.signOut();
        redirect('/');
    }

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { name: "Home", href: "/", isActive: true },
        { name: "Find Doctors", href: "/all-doctors" },
        { name: "About Us", href: "#about" },
        { name: "Contact Us", href: "#footer" },
        // { name: "Dashboard", href: "#" }
    ];

    const dashboardLinks = {
        admin: '/dashboard/admin',
        patient_family: '/dashboard/patient',
        medical_specialist: '/dashboard/medSpecialist'
    }

    if (user?.email) {
        menuItems.push({ name: "Dashboard", href: dashboardLinks[user?.accountRole || 'patient_family'] });
    }


    return (
        <nav className={`fixed top-0  w-full z-50 h-[80px] flex items-center transition-colors duration-200 ${scrolled ? 'bg-[#f8f9ff]/50 dark:bg-[#00458f]/30 backdrop-blur-md border-b border-[#c2c6d3]/10' : 'bg-[#f8f9ff]/50 dark:bg-[#00458f]/70 border-b border-[#c2c6d3]/30'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">

                {/* 1. Left Side: Brand Logo & Title */}
                <div className="flex items-center gap-2">
                    {/* Mobile Hamburger Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-[#003f83] mr-2 flex items-center justify-center w-8 h-8"
                        aria-label="Toggle menu"
                    >
                        {/* Swapped with Gravity UI Menu/Close Icons */}
                        {isMenuOpen ? <Xmark size={24} className='dark:text-[#d7e2ff]' /> : <Bars size={24} className='dark:text-[#d7e2ff]' />}
                    </button>

                    <div className="flex items-center gap-2 cursor-pointer">
                        {/* Logo Image */}
                        <div className=''>
                            <Image
                                src="/assets/logo.png"
                                alt="Healthcare Icon"
                                width={35} height={30}
                            />
                        </div>

                        <span className="font-manrope text-[20px] lg:text-2xl font-extrabold leading-8 text-[#003f83] dark:text-[#d7e2ff] whitespace-nowrap">
                            Medicare <span className="font-normal">Connect</span>
                        </span>
                    </div>
                </div>

                {/* 2. Middle: Centered Navigation Links (Hidden on Mobile) */}
                <ul className="hidden md:flex gap-[32px] items-center m-0 p-0 list-none">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                className={`font-manrope text-[16px] font-[500] leading-[24px] pb-2 transition-all duration-150 block `}
                            //  ${item.isActive
                            // ? "text-[#003f83] dark:text-[#d7e2ff] font-bold border-b-[3px] border-[#003f83] dark:border-[#d7e2ff]"
                            // : "text-[#575f69] dark:text-[#bfc7d3] hover:text-[#003f83] dark:hover:text-[#d7e2ff]"
                            // }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* 3. Right Side: Dark Mode & Action Buttons */}
                <div className="flex items-center gap-4">

                    {/* Integrated clean ThemeSwitch */}
                    <ThemeSwitch />

                    {/* Desktop Buttons (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-4">
                        {
                            isPending ?
                                (
                                    <h2>Loading</h2>
                                )
                                :
                                user ?
                                    (<>
                                        <Button
                                            onClick={handleSignOut}
                                            variant="bordered"
                                            className="border-[2px] border-red-700 text-red-700 dark:border-red-300 dark:text-red-300 font-hanken text-[14px] font-[700] rounded-lg px-6 h-[42px] bg-transparent hover:bg-red-700 dark:hover:bg-red-100 hover:text-white dark:hover:text-red-700 transition-all duration-200"
                                        >
                                            Logout
                                        </Button>

                                        <div className="relative group">
                                            <button className="flex items-center gap-3 p-2 rounded-full hover:bg-[#abc7ff] dark:hover:bg-[#003f83] transition-colors border border-transparent hover:border-border">
                                                <Avatar>
                                                    <Avatar.Image referrerPolicy='no-referrer' alt={user.name}
                                                        src={user.image} />
                                                    <Avatar.Fallback>{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
                                                </Avatar>
                                                <div className="text-left hidden lg:block">
                                                    <p className="text-sm font-bold truncate max-w-25 dark:text-slate-100">{user.name}</p>
                                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{`${user.accountRole === 'admin' ? 'Admin' : user.accountRole === 'patient_family' ? 'Patient' : 'Medical Specialist'}`}</p>
                                                </div>
                                            </button>



                                            <div className="absolute right-0 top-15 w-56 bg-white dark:bg-[#00458f] border border-slate-200 dark:border-[#00458f] rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                                <div className="px-4 py-3 border-b border-slate-100 dark:border-[#00458f]">
                                                    <p className="font-bold text-sm dark:text-slate-100">Welcome back!</p>
                                                    <p className="text-xs truncate text-slate-500 dark:text-slate-300">{user.email}</p>
                                                </div>
                                                <Link href={dashboardLinks[user.accountRole]} className="px-4 py-2 text-sm hover:bg-[#abc7ff]/50 dark:hover:bg-[#003f83] dark:text-slate-200 flex items-center gap-3 transition-colors">
                                                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                                                </Link>
                                            </div>

                                        </div>


                                    </>)
                                    :
                                    (<>
                                        <Link href="/auth/login">
                                            <Button
                                                variant="bordered"
                                                className="border-[2px] border-[#003f83] text-[#003f83] dark:border-[#abc7ff] dark:text-[#abc7ff] font-hanken text-[14px] font-[700] rounded-lg px-6 h-[42px] bg-transparent hover:bg-[#003f83] dark:hover:bg-[#abc7ff] hover:text-white dark:hover:text-[#003f83] transition-all duration-200"
                                            >
                                                Login
                                            </Button>
                                        </Link>

                                        <Link href="/auth/register">
                                            <Button

                                                className="bg-[#003f83] dark:bg-[#b7ceff] text-white dark:text-[#003f83] font-hanken text-[14px] font-[700] rounded-lg px-6 h-[42px] hover:opacity-90 shadow-sm transition-all duration-200"
                                            >
                                                Register
                                            </Button>
                                        </Link>
                                    </>)
                        }

                    </div>
                </div>

            </div>

            {/* 4. Mobile Dropdown Panel Drawer */}
            <div
                className={`${isMenuOpen ? 'flex' : 'hidden'
                    } fixed top-[80px] left-0 w-full bg-[#f8f9ff] dark:bg-[#d0dbed] shadow-lg flex-col p-6 gap-4 border-t border-[#c2c6d3]/20 md:hidden transition-all z-40`}
            >
                <ul className="flex flex-col gap-4 m-0 p-0 list-none">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                className={`w-full font-manrope text-[18px] py-2 border-b border-[#c2c6d3]/20 block ${item.isActive ? "text-[#003f83] font-bold" : "text-[#575f69]"
                                    }`}
                                href={item.href}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                    {
                        user ?
                            <>
                                <h2 className="text-[#003f83] font-hanken text-[18px]">Welcome, {user.name}</h2>
                                <Button
                                    onClick={handleSignOut}
                                    className="w-full bg-red-700/80 text-white font-hanken py-6 text-[16px] rounded-lg"
                                >
                                    Logout
                                </Button>
                            </> :
                            <>
                                <Button
                                    href="/auth/login"
                                    variant="bordered"
                                    className="w-full border-[2px] border-[#003f83] text-[#003f83] font-hanken py-6 text-[16px] rounded-lg"
                                >
                                    Login
                                </Button>
                                <Button
                                    href="/auth/register"
                                    className="w-full bg-[#003f83] text-white font-hanken py-6 text-[16px] rounded-lg"
                                >
                                    Register
                                </Button>
                            </>
                    }
                </div>
            </div>
        </nav>
    );
}