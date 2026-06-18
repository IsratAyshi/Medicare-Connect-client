'use client';

import { useState, useEffect } from 'react';
import { Link, Button } from "@heroui/react";
// Import Gravity UI Icon components
import { HeartPulse, Bars, Xmark, Sun, Moon } from '@gravity-ui/icons';
import Image from 'next/image';
import { ThemeSwitch } from '../ThemeSwitch';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { name: "Home", href: "/", isActive: true },
        { name: "Find Doctors", href: "/api/all-doctors" },
        { name: "About Us", href: "#about" },
        { name: "Contact Us", href: "#footer" },
        // { name: "Dashboard", href: "#" }
    ];

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
                        <Link href="/auth/login">
                            <Button
                                variant="bordered"
                                className="border-[2px] border-[#003f83] text-[#003f83] dark:border-[#abc7ff] dark:text-[#abc7ff] font-hanken text-[14px] font-[700] rounded-lg px-6 h-[42px] bg-transparent hover:bg-[#003f83] dark:hover:bg-[#abc7ff] hover:text-white dark:hover:text-[#003f83] transition-all duration-200"
                            >
                                Login
                            </Button>
                        </Link>

                        <Button
                            href="#"
                            className="bg-[#003f83] dark:bg-[#b7ceff] text-white dark:text-[#003f83] font-hanken text-[14px] font-[700] rounded-lg px-6 h-[42px] hover:opacity-90 shadow-sm transition-all duration-200"
                        >
                            Register
                        </Button>
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
                    <Button
                        href="#"
                        variant="bordered"
                        className="w-full border-[2px] border-[#003f83] text-[#003f83] font-hanken py-6 text-[16px] rounded-lg"
                    >
                        Login
                    </Button>
                    <Button
                        href="#"
                        className="w-full bg-[#003f83] text-white font-hanken py-6 text-[16px] rounded-lg"
                    >
                        Register
                    </Button>
                </div>
            </div>
        </nav>
    );
}