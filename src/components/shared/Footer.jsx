'use client';

import Image from 'next/image';
import Link from 'next/link';
// Import matching Gravity UI icons
import { Envelope, Handset, Display, Globe, NodesRight, ThumbsUp, StarFill, LogoFacebook } from '@gravity-ui/icons';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer" className="w-full bg-[#eef3ff] dark:bg-[#002b5c] border-t border-[#c2c6d3]/30 text-[#2c3e50] dark:text-[#d7e2ff] transition-colors duration-200 font-manrope">
            {/* Upper Footer Layout Section */}
            <div className="container mx-auto px-6 pt-16 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Column 1: Brand Intro */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Image
                                src="/assets/logo.png"
                                alt="Healthcare Logo"
                                width={35}
                                height={30}
                                priority
                            />
                            <span className="text-[24px] font-extrabold leading-[32px] text-[#003f83] dark:text-[#fff]">
                                Medicare <span className="font-normal">Connect</span>
                            </span>
                        </div>
                        <p className="text-[15px] font-[500] leading-[24px] text-[#575f69] dark:text-[#bfc7d3] max-w-[280px]">
                            Leading the way in medical excellence, trusted by patients worldwide for professional and empathetic care.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[18px] font-[700] text-[#003f83] dark:text-[#fff]">
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-3 m-0 p-0 list-none text-[15px] font-[500]">
                            <li>
                                <Link href="#" className="text-[#575f69] dark:text-[#bfc7d3] hover:text-[#003f83] dark:hover:text-[#fff] transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#575f69] dark:text-[#bfc7d3] hover:text-[#003f83] dark:hover:text-[#fff] transition-colors">
                                    Our Doctors
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#575f69] dark:text-[#bfc7d3] hover:text-[#003f83] dark:hover:text-[#fff] transition-colors">
                                    Departments
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#575f69] dark:text-[#bfc7d3] hover:text-[#003f83] dark:hover:text-[#fff] transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[18px] font-[700] text-[#003f83] dark:text-[#fff]">
                            Contact Info
                        </h3>
                        <ul className="flex flex-col gap-3 m-0 p-0 list-none text-[15px] font-[500] text-[#575f69] dark:text-[#bfc7d3]">
                            <li className="flex items-center gap-2.5">
                                <Envelope size={16} className="text-[#003f83] dark:text-[#fff] shrink-0" />
                                <span className="truncate">support@medicareconnect.com</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Handset size={16} className="text-[#003f83] dark:text-[#fff] shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Display size={16} className="text-[#003f83] dark:text-[#fff] mt-1 shrink-0" />
                                <span>123 Healthcare Way, Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Emergency Hotline & Socials */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[18px] font-[700] text-[#003f83] dark:text-[#fff]">
                            Emergency Hotline
                        </h3>

                        {/* Custom Alert Box */}
                        <div className="bg-[#ffebeb] dark:bg-[#4a1515] border border-[#ffd1d1]/50 dark:border-transparent rounded-xl p-4 flex flex-col gap-1 max-w-[290px]">
                            <div className="flex items-center gap-2 text-[#b30000] dark:text-[#ff9494] font-[800] text-[20px]">
                                <StarFill size={18} />
                                <span>911 / 112</span>
                            </div>
                            <p className="text-[13px] font-[600] text-[#731a1a] dark:text-[#ffc7c7]">
                                Available 24/7 for urgent care
                            </p>
                        </div>

                        {/* Social Sharing Circle Action Handles */}
                        <div className="flex items-center gap-3 mt-1">
                            <button className="w-9 h-9 rounded-full bg-[#003f83]/10 dark:bg-[#fff]/10 flex items-center justify-center text-[#003f83] dark:text-[#fff] hover:scale-105 transition-transform">
                                <Globe size={16} />
                            </button>

                            <button className="w-9 h-9 rounded-full bg-[#003f83]/10 dark:bg-[#fff]/10 flex items-center justify-center text-[#003f83] dark:text-[#fff] hover:scale-105 transition-transform">
                                <NodesRight size={16} />
                            </button>
                            <button className="w-9 h-9 rounded-full bg-[#003f83]/10 dark:bg-[#fff]/10 flex items-center justify-center text-[#003f83] dark:text-[#fff] hover:scale-105 transition-transform">
                                <LogoFacebook size={16} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Lower Copyright & Legal Footer Bar */}
            <div className="w-full border-t border-[#c2c6d3]/20 py-6 text-[14px] font-[500] text-[#717781] dark:text-[#a5b4fc]">
                <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p>© {currentYear} Medicare Connect. All rights reserved.</p>
                    <div className="flex items-center gap-6 mr-15">
                        <Link href="#" className="hover:text-[#003f83] dark:hover:text-[#fff] transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="#" className="hover:text-[#003f83] dark:hover:text-[#fff] transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}