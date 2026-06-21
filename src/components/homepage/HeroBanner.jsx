'use client';

import { Link, Button } from "@heroui/react";
import { Magnifier, ChevronRight } from '@gravity-ui/icons';
import FloatingStats from "./FloatingStats";

export default function HeroBanner({ stats }) {
    return (
        <section
            className="relative w-full min-h-[calc(100vh-80px)] bg-cover bg-center bg-no-repeat flex items-center py-40 px-6 lg:px-12 overflow-hidden font-manrope transition-colors duration-200"
            style={{
                backgroundImage: "url('/assets/bannerBg2.jpg')",
            }}
        >
            {/* 1. Background Overlay*/}
            <div className="absolute inset-0 bg-white/40 dark:bg-[#001f42]/50 z-0 pointer-events-none transition-colors duration-200" />

            {/* 2. Main Layout Container*/}
            <div className="w-full container mx-auto px-6  relative z-10">

                {/* ==== LEFT CONTENT COLUMN ==== */}
                <div className=" flex flex-col justify-center text-left">

                    {/* Subheading Label Tag */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-6 h-[2px] bg-[#003f83] dark:bg-[#b7ceff]" />
                        <span className="text-[14px] uppercase font-[700] tracking-wider text-[#003f83] dark:text-[#b7ceff]">
                            Welcome to Medicare Connect Health Care System
                        </span>
                    </div>

                    {/* Header Statement */}
                    <h1 className="text-[40px] sm:text-[48px] lg:text-[56px] tracking-wider font-extrabold leading-[1.15] text-[#00234a] dark:text-white mb-6">
                        Compassionate care,<br />
                        <span className="text-[#0052ad] dark:text-[#d7e2ff]">Exceptional results.</span>
                    </h1>

                    {/* Description*/}
                    <p className="text-[16px] sm:text-[18px] font-[500] leading-[28px] text-[#575f69] dark:text-[#bfc7d3] max-w-[540px] mb-8">
                        Our team of experienced doctors and healthcare professionals are committed to providing quality care and personalized attention to our patients.
                    </p>

                    {/* Call-To-Actions*/}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <Link
                            href="/all-doctors">
                            <Button
                                className="bg-[#003f83] dark:bg-[#b7ceff] text-white dark:text-[#003f83] font-hanken text-[15px] font-[700] rounded-xl px-7 h-[52px] hover:opacity-90 shadow-md transition-all duration-200"
                            >
                                <Magnifier size={16} /> Find a Doctor
                            </Button>
                        </Link>

                        <Link href="#about">
                            <Button
                                variant="bordered"
                                className="border-[2px] border-[#003f83] dark:border-[#abc7ff] text-[#003f83] dark:text-[#abc7ff] font-hanken text-[15px] font-[700] rounded-xl px-7 h-[52px] bg-transparent hover:bg-[#003f83] dark:hover:bg-[#abc7ff] hover:text-white dark:hover:text-[#003f83] transition-all duration-200"
                            >
                                Learn More <ChevronRight size={16} />
                            </Button>
                        </Link>
                    </div>

                    <div className="w-full max-w-[100px] aspect-4/5 mt-8">
                    </div>
                </div>


            </div>

            {/* ==== FLOATING STATS ==== */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[1200px] z-20">
                <FloatingStats stats={stats} />
            </div>

        </section>
    );
}