import React from 'react';
import DoctorCard from '../doctors/DoctorCard';
import Link from 'next/link';
import { ArrowBigRight } from 'lucide-react';

const FeaturedDoctors = ({ featuredDoctors = [] }) => {
    return (
        <section className="w-full bg-[#f8f9ff] dark:bg-[#0D1C2D] py-16 px-6 font-manrope transition-colors duration-200">
            <div className="max-w-[1200px] mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-[32px] sm:text-[36px] font-[800] text-[#003f83] dark:text-[#fff] mb-3 leading-tight">
                            Meet Our Featured Medical Specialists
                        </h1>
                        <p className="text-[15px] sm:text-[16px] font-[500] leading-[26px] text-[#575f69] dark:text-[#bfc7d3]">
                            Dedicated professionals who specialize in various medical fields and provide exceptional care.
                        </p>
                    </div>

                    {/* View All Redirect Link */}
                    <Link
                        href="/all-doctors"
                        className="text-sm font-bold text-[#0052ad] dark:text-[#abc7ff] whitespace-nowrap shrink-0 transition-all border-b-2 border-transparent hover:border-[#0052ad] pb-1 flex items-center gap-2"
                    >
                        View all doctors <ArrowBigRight size={16} />
                    </Link>
                </div>

                {/* Grid Layout Container */}
                {featuredDoctors.length === 0 ? (
                    <div className="w-full py-12 text-center text-slate-400 bg-slate-100/50 dark:bg-slate-900/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                        No featured medical specialist records found at this moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                        {featuredDoctors.map((doctor) => (
                            <div key={doctor._id || doctor.doctorName} className="w-full h-full flex justify-center">
                                {/* Layout parameter set to grid default variant */}
                                <DoctorCard doctor={doctor} layout="grid" />
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
};

export default FeaturedDoctors;